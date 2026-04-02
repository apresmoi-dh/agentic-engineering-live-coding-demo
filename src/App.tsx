import { useState, useMemo } from 'react';
import './App.css';
import { Nav } from './layout/Nav';
import { Page, PageHeader } from './layout/Page';
import { Filters } from './components/Filters';
import { CompareCard } from './components/CompareCard';
import { loadSpecs } from './data/loadSpecs';
import { FILTERS } from './logic/filters';
import { computeBestInClass } from './logic/bestInClass';
import { SECTIONS } from './logic/sections';

const specs = loadSpecs();

export function App() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const visibleSlugs = useMemo(() => {
    const slugs = new Set<string>();
    for (const spec of specs) {
      const passes = [...activeFilters].every((key) => {
        const filter = FILTERS.find((f) => f.key === key);
        return filter ? filter.predicate(spec) : true;
      });
      if (passes) slugs.add(spec.slug);
    }
    return slugs;
  }, [activeFilters]);

  const bestByField = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const section of SECTIONS) {
      for (const row of section.rows) {
        map.set(row.field, computeBestInClass(specs, row.field, visibleSlugs));
      }
    }
    return map;
  }, [visibleSlugs]);

  const handleToggle = (key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <>
      <Nav />
      <Page>
        <PageHeader
          title="Robot Vacuum Comparison"
          subtitle="5 models compared side by side — local control, camera capabilities, cleaning power, and hardware."
        />
        <Filters
          filters={FILTERS}
          activeFilters={activeFilters}
          onToggle={handleToggle}
        />
        <CompareCard
          specs={specs}
          visibleSlugs={visibleSlugs}
          bestByField={bestByField}
        />
      </Page>
    </>
  );
}
