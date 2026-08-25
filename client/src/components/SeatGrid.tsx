type SeatGridProps = {
  total: number;
  /** Seats sold. Ignored when `known` is false. */
  taken: number;
  /** False while loading, or if /api/seats couldn't be reached. */
  known: boolean;
  /** True on the inverted sold-out card. */
  inverted?: boolean;
};

/**
 * Six seats as two rows of three — a room, not a progress bar.
 *
 * Purely presentational: the grid never decides whether a seat can be bought,
 * it only shows what Stripe reported. Marked as a single labelled image because
 * the seats aren't individually selectable — you don't pick seat 4 over seat 5.
 */
export function SeatGrid({ total, taken, known, inverted = false }: SeatGridProps) {
  const filled = known ? Math.min(Math.max(taken, 0), total) : 0;

  // Deliberately no live count in the label — the grid is a picture of the
  // room, not an availability meter. Sold out is the only state it reports.
  const label =
    known && filled >= total ? `Sold out, ${total} seats` : `${total}-seat room`;

  // Six seats sit as two rows of three; ten as two rows of five. Anything
  // else falls back to three columns.
  const cols = total % 5 === 0 ? 5 : 3;

  return (
    <div
      className={`seat-grid${inverted ? " seat-grid--inverted" : ""}`}
      role="img"
      aria-label={label}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        maxWidth: cols === 5 ? "320px" : undefined,
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="seat"
          data-state={!known ? "unknown" : i < filled ? "taken" : "open"}
        />
      ))}
    </div>
  );
}
