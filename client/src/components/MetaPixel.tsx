import { useEffect } from "react";
import { useLocation } from "wouter";
import { initMetaPixel, trackMeta } from "@/lib/metaPixel";

/**
 * Fires a Meta PageView on first load and on every client-side route change.
 *
 * The route-change part is the whole point: wouter navigates without a document
 * reload, so the stock pixel snippet would only ever report the landing page.
 * Without this, an audience like "visited /workshops" would miss everyone who
 * arrived on the homepage and clicked through.
 */
export function MetaPixel() {
  const [location] = useLocation();

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    trackMeta("PageView");
  }, [location]);

  return null;
}
