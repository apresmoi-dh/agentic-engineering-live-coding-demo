type TagVariant = 'success' | 'danger' | 'warning' | 'pink' | 'neutral';

export function Tag({ variant, children }: { variant: TagVariant; children: React.ReactNode }) {
  return <span className={`tag tag--${variant}`}>{children}</span>;
}
