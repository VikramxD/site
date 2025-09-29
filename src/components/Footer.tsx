import React from 'react';
import { Link } from 'react-router-dom';
const navigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blogs', to: '/blogs' },
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white text-slate-900 dark:bg-black dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-sm font-semibold uppercase tracking-[0.35em]">
          Applied Mode
        </Link>
        <nav>
          <ul className="flex flex-wrap items-center gap-4 text-sm">
            {navigationLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer; 
