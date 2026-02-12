import { useState } from "react";
import { useLocation } from "wouter";
import { Assessment } from "@/components/Assessment";
import { SEO } from "@/components/SEO";

export default function AssessmentPage() {
  const [open, setOpen] = useState(true);
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Efficiency Score Assessment"
        description="Take the free 5-minute assessment. 15 questions. See exactly where your business is bleeding time — and what to fix first."
      />
      <Assessment
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            navigate("/");
          }
          setOpen(isOpen);
        }}
      />
    </div>
  );
}
