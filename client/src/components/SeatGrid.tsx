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

  const label = known
    ? `${filled} of ${total} seats taken`
    : `${total} seats per session, availability loading`;

  return (
    <div
      className={`seat-grid${inverted ? " seat-grid--inverted" : ""}`}
      role="img"
      aria-label={label}
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
