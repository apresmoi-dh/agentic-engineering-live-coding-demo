import type { RobotSpec } from '../../types/RobotSpec';
import type { CellValue } from '../../logic/sections';
import { Tag } from '../Tag';

interface CompareRowProps {
  label: string;
  specs: RobotSpec[];
  field: string;
  getCell: (spec: RobotSpec) => CellValue;
  visibleSlugs: Set<string>;
  bestSlugs: Set<string>;
}

export function CompareRow({ label, specs, getCell, visibleSlugs, bestSlugs }: CompareRowProps) {
  return (
    <div className="compare-row">
      <div className="label-cell">{label}</div>
      {specs.map((spec) => {
        const cell = getCell(spec);
        const isBest = bestSlugs.has(spec.slug);
        const isFaded = spec.valetudo_support === false;
        const isVisible = visibleSlugs.has(spec.slug);

        const classNames = [
          'compare-cell',
          isBest ? 'best' : '',
          isFaded ? 'faded' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={spec.slug}
            className={classNames}
            data-product={spec.slug}
            data-hidden={isVisible ? 'false' : 'true'}
          >
            {cell.tag ? (
              <Tag variant={cell.tag}>{cell.text}</Tag>
            ) : cell.inlineStyle ? (
              <span style={cell.inlineStyle as React.CSSProperties}>{cell.text}</span>
            ) : (
              cell.text
            )}
          </div>
        );
      })}
    </div>
  );
}
