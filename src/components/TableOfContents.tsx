import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    
    const items = matches.map((match, index) => ({
      id: `heading-${index}`,
      title: match[2],
      level: match[1].length
    }));

    setHeadings(items);
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL without triggering a new history entry
      window.history.replaceState(null, '', `${location.pathname}#${id}`);
    }
  };

  return (
    <nav className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
      <h2 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={handleClick(heading.id)}
              className={`text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-150
                        ${location.hash === `#${heading.id}` ? 'text-gray-900 dark:text-gray-100 font-medium' : ''}`}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}; 