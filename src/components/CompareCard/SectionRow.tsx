interface SectionRowProps {
  title: string;
  iconPath: string;
}

export function SectionRow({ title, iconPath }: SectionRowProps) {
  return (
    <div className="compare-row section-row">
      <svg className="section-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d={iconPath} fill="currentColor" />
      </svg>
      {title}
    </div>
  );
}
