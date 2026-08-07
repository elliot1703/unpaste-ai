import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { MetaPixel } from "@/components/MetaPixel";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
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
import Training from "./pages/Training";
import Workshop from "./pages/Workshop";
import WorkshopBooked from "./pages/WorkshopBooked";
import Coaching from "./pages/Coaching";
import QuickWins from "./pages/QuickWins";
import Resources from "./pages/Resources";

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
      <Route path={"/training"} component={Training} />
      <Route path={"/workshops"} component={Workshop} />
      <Route path={"/workshops/booked"} component={WorkshopBooked} />
      <Route path={"/coaching"} component={Coaching} />
      <Route path={"/quick-wins"} component={QuickWins} />
      <Route path={"/resources"} component={Resources} />
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
