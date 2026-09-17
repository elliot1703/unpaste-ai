import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { trackMeta } from "@/lib/metaPixel";

type FormState = "idle" | "submitting" | "success" | "error";

export function WorkshopInterestForm({ variant }: { variant: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const attribution = useMemo(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      utmContent: params.get("utm_content") ?? "",
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const form = new FormData(event.currentTarget);
    const lead = {
      name: form.get("name"),
      email: form.get("email"),
      build: form.get("build"),
      location: form.get("location"),
      source: "next-brisbane-workshop",
      variant,
      ...attribution,
    };

    try {
      const response = await fetch("/api/workshop-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!response.ok) throw new Error("Lead capture failed");
      setState("success");
      trackMeta("Lead", { content_name: "Next Brisbane workshop", variant });
    } catch {
      setError("That didn’t go through. Please try once more.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="workshop-form-success" role="status">
        <Check className="h-6 w-6" />
        <div>
          <h3>You’re on the first-notice list.</h3>
          <p>Elliot will email when the date and room are locked.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="workshop-form" onSubmit={submit}>
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="workshop-form-wide">
        <span>What would you bring into the room? <em>Optional</em></span>
        <textarea
          name="build"
          rows={4}
          placeholder="The job, bottleneck or idea you want to make real."
        />
      </label>
      <label className="workshop-form-wide">
        <span>Preferred side of town <em>Optional</em></span>
        <select name="location" defaultValue="">
          <option value="" disabled>Select one</option>
          <option value="Bulimba">Bulimba</option>
          <option value="Newstead">Newstead</option>
          <option value="Either">Either works</option>
        </select>
      </label>
      <div className="workshop-form-wide">
        <button className="brutalist-button inline-flex items-center gap-3" disabled={state === "submitting"}>
          {state === "submitting" ? "Adding you…" : "Get first notice"}
          {state !== "submitting" && <ArrowRight className="h-4 w-4" />}
        </button>
        {error && <p className="workshop-form-error" role="alert">{error}</p>}
        <p className="workshop-form-note">
          The next date, room and price are still being shaped. This registers interest; it does not book or charge you.
        </p>
      </div>
    </form>
  );
}
