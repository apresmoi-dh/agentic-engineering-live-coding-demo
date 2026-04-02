export function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button className={`filter-chip${active ? ' active' : ''}`} onClick={onClick}>
      <span className="chip-dot" aria-hidden="true"></span>
      {label}
    </button>
  );
}
