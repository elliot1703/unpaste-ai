import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DictationNote } from "@/components/DictationNote";
import { Analytics } from "@vercel/analytics/react";
import { MetaPixel } from "@/components/MetaPixel";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Router, Switch, useSearch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Book from "./pages/Book";
import Solutions from "./pages/Solutions";
import StyleExplorer from "./pages/StyleExplorer";
import AssessmentPage from "./pages/AssessmentPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Pricing from "./pages/Pricing";
import WorkshopBooked from "./pages/WorkshopBooked";
import OfferPage from "./pages/OfferPage";
import HandOverPage from "./pages/HandOverPage";
import { OFFERS } from "@/lib/offers";
import { WORKSHOP_VARIANTS } from "@/lib/workshopVariants";
import QuickWins from "./pages/QuickWins";
import Resources from "./pages/Resources";
import ClaudeAndCoffee from "./pages/ClaudeAndCoffee";

function CoachingRedirect() {
  // The coaching page was retired 17 Oct 2026; its nearest current offer is the 1:1 setup day.
  const search = useSearch();
  return <Redirect to={`/one-on-one${search ? `?${search}` : ""}`} replace />;
}

function TrainingRedirect() {
  const search = useSearch();
  const hash = typeof window === "undefined" ? "" : window.location.hash;
  return <Redirect to={`/team-training${search ? `?${search}` : ""}${hash}`} replace />;
}

function AppRoutes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/assessment"} component={AssessmentPage} />
      <Route path={"/solutions"} component={Solutions} />
      <Route path={"/about"} component={About} />
      <Route path={"/book"} component={Book} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/training"} component={TrainingRedirect} />
      {/* Gated-pricing offer pages. /workshops is indexed; the H1 variants are noindex, ads only. */}
      <Route path={"/workshops"}>
        <OfferPage offer={OFFERS.workshop} />
      </Route>
      <Route path={"/workshops/booked"} component={WorkshopBooked} />
      {WORKSHOP_VARIANTS.map((v) => (
        <Route key={v.slug} path={`/workshops/${v.slug}`}>
          <OfferPage offer={OFFERS.workshop} variant={v} canonical={false} />
        </Route>
      ))}
      {/* 1:1 rebuilt on the $100M Offers frameworks (22 Oct 2026). Noindex, ads only, compared against /one-on-one. */}
      <Route path={"/one-on-one/hand-over"} component={HandOverPage} />
      <Route path={"/one-on-one"}>
        <OfferPage offer={OFFERS["one-on-one"]} />
      </Route>
      <Route path={"/team-training"}>
        <OfferPage offer={OFFERS.team} />
      </Route>
      <Route path={"/coaching"} component={CoachingRedirect} />
      <Route path={"/quick-wins"} component={QuickWins} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/claude-and-coffee"} component={ClaudeAndCoffee} />
      <Route path={"/styles"} component={StyleExplorer} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

interface AppProps {
  ssrPath?: string;
  helmetContext?: { helmet?: any };
}

function App({ ssrPath, helmetContext }: AppProps = {}) {
  const content = (
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <AppRoutes />
            <DictationNote />
            <Analytics />
            <MetaPixel />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );

  if (ssrPath) {
    return <Router ssrPath={ssrPath}>{content}</Router>;
  }
  return content;
}

export default App;
