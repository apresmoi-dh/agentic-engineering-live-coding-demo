import { Fragment } from 'react';
import type { RobotSpec } from '../../types/RobotSpec';
import { SECTIONS } from '../../logic/sections';
import { HeaderRow } from './HeaderRow';
import { SectionRow } from './SectionRow';
import { CompareRow } from './CompareRow';
import { VerdictRow } from './VerdictRow';
import { NoResults } from './NoResults';

interface CompareCardProps {
  specs: RobotSpec[];
  visibleSlugs: Set<string>;
  bestByField: Map<string, Set<string>>;
}

export function CompareCard({ specs, visibleSlugs, bestByField }: CompareCardProps) {
  const visibleCount = specs.filter((s) => visibleSlugs.has(s.slug)).length;

  return (
    <div className="compare-card">
      <div className="compare-scroll">
        <HeaderRow specs={specs} visibleSlugs={visibleSlugs} totalCount={specs.length} />
        {SECTIONS.map((section) => (
          <Fragment key={section.title}>
            <SectionRow title={section.title} iconPath={section.iconPath} />
            {section.rows.map((row) => (
              <CompareRow
                key={row.field}
                label={row.label}
                specs={specs}
                field={row.field}
                getCell={row.getCell}
                visibleSlugs={visibleSlugs}
                bestSlugs={bestByField.get(row.field) ?? new Set()}
              />
            ))}
          </Fragment>
        ))}
        <VerdictRow specs={specs} visibleSlugs={visibleSlugs} />
        <NoResults visible={visibleCount === 0} />
      </div>
    </div>
  );
}
