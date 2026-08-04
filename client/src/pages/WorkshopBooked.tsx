import { ArrowRight, Calendar, Laptop, MapPin } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CONTACT_EMAIL } from "@/lib/booking";
import { WORKSHOP_VENUE } from "@/lib/workshops";

/**
 * Stripe's success_url lands here after payment.
 *
 * Stripe emails a payment receipt, not a confirmation — so this page carries
 * the venue address and what to bring. It's the only thing the buyer is
 * guaranteed to see immediately after paying.
 */
export default function WorkshopBooked() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="You're in — Brisbane AI workshop | unpaste.ai"
        description="Your seat at the Brisbane Claude Code workshop is confirmed."
        url="https://unpaste.ai/workshops/booked"
        noIndex
      />
      <div className="grid-background" />
      <div className="relative z-10">
        <Navigation />

        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container">
            <div className="max-w-3xl">
              <div className="section-tag mb-8">[001] SEAT CONFIRMED</div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8">
                YOU'RE IN. <span className="text-primary">SEE YOU THERE.</span>
              </h1>

              <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed mb-12 max-w-2xl">
                Your seat is paid for and held. Stripe has emailed your receipt.
                I'll send your tax invoice and a reminder closer to the day — if
                you need the invoice sooner, just reply to the receipt.
              </p>

              <div className="stats-grid grid sm:grid-cols-3 border border-border mb-12">
                <div className="p-6">
                  <MapPin className="h-5 w-5 text-primary mb-4" />
                  <div className="mono-label mb-2">WHERE</div>
                  <div className="font-mono text-sm leading-relaxed">
                    {WORKSHOP_VENUE.name}
                    <br />
                    {WORKSHOP_VENUE.street}
                    <br />
                    {WORKSHOP_VENUE.suburb}
                  </div>
                </div>
                <div className="p-6">
                  <Calendar className="h-5 w-5 text-primary mb-4" />
                  <div className="mono-label mb-2">WHEN</div>
                  <div className="font-mono text-sm leading-relaxed">
                    The date and time on your receipt.
                    <br />
                    Arrive 10 minutes early.
                  </div>
                </div>
                <div className="p-6">
                  <Laptop className="h-5 w-5 text-primary mb-4" />
                  <div className="mono-label mb-2">BRING</div>
                  <div className="font-mono text-sm leading-relaxed">
                    Your laptop and charger.
                    <br />
                    Nothing else needed.
                  </div>
                </div>
              </div>

              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                Can't make it any more? Email me and I'll move you to another
                session — no charge.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "About my workshop booking"
                  )}`}
                  className="brutalist-button inline-flex items-center gap-3"
                >
                  Email me
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/workshops"
                  className="brutalist-button-outline inline-flex items-center gap-3"
                >
                  Back to workshops
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
