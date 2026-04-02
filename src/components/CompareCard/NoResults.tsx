interface NoResultsProps {
  visible: boolean;
}

export function NoResults({ visible }: NoResultsProps) {
  return (
    <div className={`no-results${visible ? ' visible' : ''}`} role="status">
      No vacuums match the selected filters. Try removing one or more filters.
    </div>
  );
}
