import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-primary" />
              <span className="font-mono text-sm font-bold">UNPASTE</span>
            </Link>
            <p className="font-mono text-xs text-muted-foreground max-w-sm leading-relaxed">
              AI coaching, training, workshops, and custom development for Brisbane businesses. Learn it or have it built — either way, you own the system.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-3 font-mono text-xs text-muted-foreground">
              <li><Link href="/coaching" className="hover:text-foreground transition-colors">COACHING & DEV DAYS</Link></li>
              <li><Link href="/training" className="hover:text-foreground transition-colors">TRAINING</Link></li>
              <li><Link href="/resources" className="hover:text-foreground transition-colors">FREE RESOURCES</Link></li>
              <li><Link href="/solutions" className="hover:text-foreground transition-colors">SOLUTIONS</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">ABOUT</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">PRICING</Link></li>
              <li><Link href="/book" className="hover:text-foreground transition-colors">BOOK A CALL</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 font-mono text-xs text-muted-foreground">
              <li>
                <a href="mailto:elliot@unpaste.co" className="hover:text-foreground transition-colors flex items-center gap-1">
                  ELLIOT@UNPASTE.CO
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>BRISBANE, AUSTRALIA</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border font-mono text-xs text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} UNPASTE.AI. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">PRIVACY</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">TERMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
