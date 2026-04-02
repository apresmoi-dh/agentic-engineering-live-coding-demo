import type { RobotSpec } from '../../types/RobotSpec';
import { ProductHeader } from './ProductHeader';

interface HeaderRowProps {
  specs: RobotSpec[];
  visibleSlugs: Set<string>;
  totalCount: number;
}

export function HeaderRow({ specs, visibleSlugs, totalCount }: HeaderRowProps) {
  const visibleCount = specs.filter((s) => visibleSlugs.has(s.slug)).length;
  const countText =
    visibleCount === totalCount
      ? `${totalCount} models`
      : `${visibleCount} of ${totalCount}`;

  return (
    <div className="compare-row header-row">
      <div className="label-cell">
        <span className="header-count">{countText}</span>
      </div>
      {specs.map((spec) => (
        <ProductHeader
          key={spec.slug}
          spec={spec}
          hidden={!visibleSlugs.has(spec.slug)}
        />
      ))}
    </div>
  );
}
