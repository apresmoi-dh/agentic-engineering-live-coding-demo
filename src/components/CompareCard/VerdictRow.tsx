import type { RobotSpec } from '../../types/RobotSpec';
import { VerdictBadge } from '../VerdictBadge';

interface VerdictRowProps {
  specs: RobotSpec[];
  visibleSlugs: Set<string>;
}

export function VerdictRow({ specs, visibleSlugs }: VerdictRowProps) {
  return (
    <div className="compare-row verdict-row">
      <div className="label-cell">Verdict</div>
      {specs.map((spec) => {
        const isFaded = spec.valetudo_support === false;
        const isVisible = visibleSlugs.has(spec.slug);

        const classNames = ['compare-cell', isFaded ? 'faded' : '']
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={spec.slug}
            className={classNames}
            data-product={spec.slug}
            data-hidden={isVisible ? 'false' : 'true'}
          >
            <VerdictBadge level={spec.verdict_level}>{spec.verdict_label}</VerdictBadge>
          </div>
        );
      })}
    </div>
  );
}
