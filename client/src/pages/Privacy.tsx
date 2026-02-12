import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Privacy Policy"
        description="How Unpaste.ai collects, uses, and protects your information."
        url="https://unpaste.ai/privacy"
      />

      <Navigation />

      <main className="container max-w-3xl py-24">
        <div className="mb-12">
          <span className="section-tag">[LEGAL]</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mt-2">
            PRIVACY POLICY
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-4">
            Last updated: 12 February 2026
          </p>
        </div>

        <div className="space-y-10 font-mono text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">WHO WE ARE</h2>
            <p>
              Unpaste.ai is operated by Elliot Stone, ABN pending, based in Brisbane, Australia.
              We provide AI automation consulting and implementation services for small and
              medium businesses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">WHAT WE COLLECT</h2>
            <p className="mb-3">We collect information you provide directly:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-foreground">Assessment responses:</strong> Your answers
                to the Efficiency Score assessment, including your name, email address, and
                optional business name.
              </li>
              <li>
                <strong className="text-foreground">Contact form submissions:</strong> Name,
                email, and any message you send via our contact or booking forms.
              </li>
              <li>
                <strong className="text-foreground">Workshop bookings:</strong> Name, email,
                business name, and scheduling preferences.
              </li>
            </ul>
            <p className="mt-3">We also collect basic analytics data:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                Page views and general usage patterns (via privacy-focused analytics — no
                personal tracking, no cookies).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">HOW WE USE IT</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>To deliver your Efficiency Score results.</li>
              <li>To follow up about workshop bookings you've requested.</li>
              <li>To respond to enquiries you've sent us.</li>
              <li>To improve our website and assessment experience.</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal information with third parties for
              their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">DATA STORAGE</h2>
            <p>
              Your data is stored on secure servers provided by Vercel (hosting) and any
              connected services we use to manage leads (e.g., Google Sheets, n8n automation
              workflows). All data is transmitted over HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">COOKIES</h2>
            <p>
              We use privacy-focused analytics that do not use cookies or track you across
              websites. No cookie consent banner is required because we don't use tracking
              cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">YOUR RIGHTS</h2>
            <p>Under the Australian Privacy Act 1988, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your information.</li>
              <li>Withdraw consent for future communications.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a
                href="mailto:hello@unpaste.ai"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                hello@unpaste.ai
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">THIRD-PARTY SERVICES</h2>
            <p>We use the following services that may process your data:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-foreground">Vercel:</strong> Website hosting.</li>
              <li><strong className="text-foreground">Google Workspace:</strong> Email communication.</li>
              <li><strong className="text-foreground">Umami:</strong> Privacy-focused analytics (no personal data collected).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">CHANGES</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page
              with an updated date. Continued use of the site after changes constitutes
              acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3">CONTACT</h2>
            <p>
              Questions about this policy? Email{" "}
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
