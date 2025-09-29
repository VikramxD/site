import React from 'react';

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
  activeId: string | null;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings, activeId }) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-3 text-[11px] text-slate-500 dark:text-slate-400">
        <p className="uppercase tracking-[0.2em] text-[10px] text-slate-400 dark:text-slate-600">
          On this page
        </p>
        <nav>
          <ul className="space-y-1">
            {headings.map((heading) => {
              const isActive = heading.id === activeId;
              return (
                <li
                  key={heading.id}
                  className={`transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  style={{ marginLeft: heading.level === 3 ? '1rem' : 0 }}
                >
                  <a href={`#${heading.id}`} className="block py-1">
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default TableOfContents;
