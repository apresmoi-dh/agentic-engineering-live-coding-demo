import type { FilterDef } from '../../logic/filters';
import { FilterChip } from '../FilterChip';

interface FiltersProps {
  filters: FilterDef[];
  activeFilters: Set<string>;
  onToggle: (key: string) => void;
}

export function Filters({ filters, activeFilters, onToggle }: FiltersProps) {
  return (
    <div className="filters" role="group" aria-label="Filter vacuums by features">
      <span className="filters-label">Filter:</span>
      {filters.map((filter) => (
        <FilterChip
          key={filter.key}
          label={filter.label}
          active={activeFilters.has(filter.key)}
          onClick={() => onToggle(filter.key)}
        />
      ))}
    </div>
  );
}
