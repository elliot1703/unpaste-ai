import { Check, Paperclip, Send } from "lucide-react";

// "What people build": each example is a small picture of the result, not a
// sentence about it. All figures and names here are illustrative and the
// section says so; nothing is presented as a real customer's data.

const P = "/images/workshops/2026-09-16";
const L = "/images/logos";

export function BuildExamples() {
  return (
    <div className="bx-grid">
      {/* 1. Quote email */}
      <article className="bx bx-red">
        <header><h3>A quote, written and sent</h3><p>From your job notes and site photos, priced off your rate card, sent from your own inbox.</p></header>
        <div className="bx-ask"><span>You say</span><p>“Quote the Alma St deck from the ServiceM8 job and the photos. Standard rates. Send it to Sarah.”</p></div>
        <div className="bx-tools"><span><img src={`${L}/servicem8.png`} alt="" /> ServiceM8</span><span><img src={`${L}/googledrive.svg`} alt="" /> Rate card in Drive</span><span><img src={`${L}/gmail.svg`} alt="" /> Gmail</span></div>
        <div className="bx-mock bx-mail">
          <div className="bx-mail-top"><img src={`${L}/gmail.svg`} alt="" /><span>To: sarah@hendersonhomes.com.au</span></div>
          <div className="bx-mail-subject">Quote #1042 · Deck repair, 14 Alma St</div>
          <div className="bx-lines"><i style={{ width: "92%" }} /><i style={{ width: "78%" }} /><i style={{ width: "60%" }} /></div>
          <div className="bx-mail-foot"><span className="bx-chip"><Paperclip /> Quote-1042.pdf</span><span className="bx-sent"><Send /> Sent 4:12pm</span></div>
        </div>
      </article>

      {/* 2. CRM card */}
      <article className="bx bx-blue">
        <header><h3>Customer details, filed for you</h3><p>Say what happened on the call. The CRM record gets written, with the next step and a reminder.</p></header>
        <div className="bx-ask"><span>You say</span><p>“Just got off the phone with Mark Delaney, office fit-out, two bathrooms. Site visit Thursday 9, quote Friday.”</p></div>
        <div className="bx-tools"><span><img src={`${L}/hubspot.svg`} alt="" /> HubSpot</span><span><img src={`${L}/gmail.svg`} alt="" /> Calendar invite</span></div>
        <div className="bx-mock bx-crm">
          <div className="bx-crm-top"><img src={`${L}/hubspot.svg`} alt="" /><span className="bx-tag">Filed by your agent</span></div>
          <dl>
            <div><dt>Contact</dt><dd>Mark Delaney</dd></div>
            <div><dt>Job</dt><dd>Office fit-out, 2 bathrooms</dd></div>
            <div><dt>Next step</dt><dd>Site visit Thu 9am</dd></div>
            <div><dt>Follow-up</dt><dd>Fri, quote</dd></div>
          </dl>
        </div>
      </article>

      {/* 3. Monday brief */}
      <article className="bx bx-green">
        <header><h3>The Monday numbers, before coffee</h3><p>Last week’s sales, ad spend, clicks and new leads in one brief, on your phone at 7am every Monday.</p></header>
        <div className="bx-ask"><span>You say</span><p>“Every Monday at 7, send me last week’s numbers and who I should call first.”</p></div>
        <div className="bx-tools"><span><img src={`${L}/shopify.svg`} alt="" /> Shopify</span><span><img src={`${L}/meta.svg`} alt="" /> Meta Ads</span><span><img src={`${L}/googleads.svg`} alt="" /> Google Ads</span><span><img src={`${L}/hubspot.svg`} alt="" /> HubSpot</span></div>
        <div className="bx-mock bx-brief">
          <div className="bx-brief-top"><span>Monday brief</span><span>7:02am</span></div>
          <ul>
            <li><span><img src={`${L}/shopify.svg`} alt="" /> Sales last week</span><b>$12,400</b></li>
            <li><span><img src={`${L}/meta.svg`} alt="" /> Ad spend</span><b>$310</b></li>
            <li><span><img src={`${L}/googleads.svg`} alt="" /> Google clicks</span><b>184</b></li>
            <li><span><img src={`${L}/hubspot.svg`} alt="" /> New leads to call</span><b>7</b></li>
          </ul>
        </div>
      </article>

      {/* 4. Instagram draft */}
      <article className="bx bx-purple">
        <header><h3>Posts that sound like you</h3><p>Your brand voice saved once. Three drafts a week from your own photos, laid out in your Canva kit, waiting for a yes.</p></header>
        <div className="bx-ask"><span>You say</span><p>“Three posts for this week from the Alma St photos. Our voice, our colours. Mention November bookings.”</p></div>
        <div className="bx-tools"><span><img src={`${L}/canva.png`} alt="" /> Canva</span><span><img src={`${L}/instagram.svg`} alt="" /> Instagram</span></div>
        <div className="bx-mock bx-ig">
          <div className="bx-ig-top"><img src={`${L}/instagram.svg`} alt="" /><span>hendersonhomes</span><span className="bx-tag">Draft 1 of 3</span></div>
          <img className="bx-ig-photo" src={`${P}/table.webp`} alt="" loading="lazy" />
          <p className="bx-ig-cap"><b>hendersonhomes</b> Deck done at Alma St. Spotted gum, oiled twice, ready for summer. Quotes open for November.</p>
          <div className="bx-ig-approve"><Check /> Approve</div>
        </div>
      </article>
    </div>
  );
}
