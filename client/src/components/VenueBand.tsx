import type { Venue } from "@/lib/workshops";

type VenueBandProps = { venue: Venue };

/**
 * Venue photos as a feature panel plus a stacked pair.
 *
 * The photos are warm beige and timber; the site is black, white and red.
 * Deliberately no filter or duotone — people read these to find out what the
 * room actually looks like, so recolouring it would misinform. The brutalist
 * treatment lives entirely in the frame: 1px gaps with the border showing
 * through (same construction as .stats-grid and the seat grid), mono captions,
 * hard inset border on hover.
 */
export function VenueBand({ venue }: VenueBandProps) {
  const photos = venue.photos ?? [];
  if (photos.length === 0) return null;

  const [feature, ...rest] = photos;

  return (
    <div className="venue-grid">
      <VenueCell photo={feature} feature />
      {rest.length > 0 && (
        <div className="venue-stack">
          {rest.map((p) => (
            <VenueCell key={p.src} photo={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function VenueCell({
  photo,
  feature = false,
}: {
  photo: NonNullable<Venue["photos"]>[number];
  feature?: boolean;
}) {
  return (
    <figure className={`venue-cell${feature ? " venue-cell--feature" : ""}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        width={feature ? 1600 : 1200}
        height={feature ? 1000 : 900}
      />
      <figcaption className="venue-cap">
        <strong>{photo.caption}</strong>
        {photo.meta && <span className="mono-label">{photo.meta}</span>}
      </figcaption>
    </figure>
  );
}
