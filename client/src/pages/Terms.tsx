import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Terms of Service"
        description="Terms governing your use of the Unpaste.ai website and services."
        url="https://unpaste.ai/terms"
      />

      <Navigation />

      <main className="container max-w-3xl py-24">
        <div className="mb-12">
          <span className="section-tag">[LEGAL]</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mt-2">
            TERMS OF SERVICE
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-4">
            Last updated: 12 February 2026
          </p>
        </div>

        <div className="space-y-10 font-mono text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">OVERVIEW</h2>
            <p>
              These terms govern your use of the unpaste.ai website and any services provided
              by Unpaste (operated by Elliot Stone, Brisbane, Australia). By using this site,
              you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">THE ASSESSMENT</h2>
            <p>
              The Efficiency Score assessment is a free tool that provides a general indication
              of potential automation opportunities in your business. Results are indicative,
              not guaranteed. Your actual outcomes from implementing automation will depend on
              your specific business context, tools, and processes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">THE WORKSHOP</h2>
            <p>
              The free 30-minute workshop is a consultation. It does not create an obligation
              for either party. Any implementation work following a workshop is subject to a
              separate agreement with defined scope, timeline, and pricing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">PAID SERVICES</h2>
            <p>
              Automation implementation projects are governed by individual project agreements.
              These agreements will specify scope, deliverables, timeline, payment terms, and
              any guarantees. Nothing on this website constitutes a binding offer for paid
              services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">INTELLECTUAL PROPERTY</h2>
            <p>
              All content on this website — text, design, code, graphics, and the Unpaste
              brand — is owned by Unpaste unless otherwise stated. You may not reproduce,
              distribute, or create derivative works from this content without written
              permission.
            </p>
            <p className="mt-3">
              For paid implementation projects: you own the automations we build for your
              business, as specified in the project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">LIMITATION OF LIABILITY</h2>
            <p>
              Unpaste provides this website and the assessment tool "as is." We make no
              warranties about the accuracy of assessment results or the suitability of
              suggested automations for your business. Our liability for any claim related to
              this website is limited to the amount you have paid us (if any) in the 12 months
              preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">USE OF THE SITE</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Submit false information through the assessment or contact forms.</li>
              <li>Attempt to interfere with the site's operation or security.</li>
              <li>Scrape or harvest data from the site without permission.</li>
              <li>Use the site for any unlawful purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">GOVERNING LAW</h2>
            <p>
              These terms are governed by the laws of Queensland, Australia. Any disputes will
              be resolved in the courts of Queensland.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">CHANGES</h2>
            <p>
              We may update these terms from time to time. Changes will be posted on this page
              with an updated date. Continued use of the site after changes constitutes
              acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">CONTACT</h2>
            <p>
              Questions about these terms? Email{" "}
              <a
                href="mailto:hello@unpaste.ai"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                hello@unpaste.ai
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; BACK TO HOME
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
