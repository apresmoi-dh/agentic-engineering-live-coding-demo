type VerdictLevel = 'best' | 'good' | 'caution' | 'skip';

export function VerdictBadge({ level, children }: { level: VerdictLevel; children: React.ReactNode }) {
  return <span className={`verdict-badge verdict--${level}`}>{children}</span>;
}
