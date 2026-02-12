import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface NavigationProps {
  onAssessmentOpen?: () => void;
}

export function Navigation({ onAssessmentOpen }: NavigationProps) {
  const [location, navigate] = useLocation();
  const handleAssessmentOpen = onAssessmentOpen ?? (() => navigate("/assessment"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollYProgress, [0, 0.02], ["rgba(250, 250, 250, 0)", "rgba(250, 250, 250, 0.95)"]);
  const navBorder = useTransform(scrollYProgress, [0, 0.02], ["rgba(228, 228, 231, 0)", "rgba(228, 228, 231, 1)"]);

  const isHome = location === "/";

  // Hash links need to go to homepage if not already there
  const hashLink = (hash: string) => isHome ? hash : `/${hash}`;

  const navLinks = [
    { label: "Solutions", href: "/solutions", type: "route" as const },
    { label: "Services", href: "#services", type: "hash" as const },
    { label: "Method", href: "#method", type: "hash" as const },
    { label: "About", href: "/about", type: "route" as const },
  ];

  return (
    <motion.nav
      style={{ backgroundColor: navBg, borderColor: navBorder }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-primary" />
          <span className="font-mono text-sm font-bold tracking-tight">UNPASTE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={hashLink(link.href)}
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/book"
            className="font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
          >
            Book Call
          </Link>
          <button
            onClick={handleAssessmentOpen}
            className="font-mono text-xs font-bold uppercase tracking-wider bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors"
          >
            Start Audit
          </button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm bg-background border-border">
            <SheetHeader>
              <SheetTitle className="text-left font-mono text-sm font-bold">MENU</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) =>
                link.type === "route" ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-mono text-lg uppercase tracking-wider"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={hashLink(link.href)}
                    className="font-mono text-lg uppercase tracking-wider"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <hr className="border-border" />
              <Link
                href="/book"
                className="font-mono text-lg uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Call
              </Link>
              <button
                onClick={() => { handleAssessmentOpen(); setMobileMenuOpen(false); }}
                className="brutalist-button w-full"
              >
                Start Audit
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
