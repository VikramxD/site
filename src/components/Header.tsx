import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, FileText, Moon, Sun, BookOpen } from 'lucide-react';
import XIcon from './XIcon';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900 dark:bg-black dark:text-slate-100">
      <div className="container bg-inherit py-5">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-[15px] font-normal">
            Applied Mode (△)
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/blogs"
              className="nav-link"
              aria-label="All Blog Posts"
            >
              <BookOpen size={14} />
            </Link>
            <a
              href="https://docs.google.com/document/d/1A8KGNkAtYyi4zIxSFWQ_mwBqhbXn8Pu_qbSNzDHwaws/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="Resume"
            >
              <FileText size={14} />
            </a>
            <a
              href="https://github.com/VikramxD"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="GitHub"
            >
              <GitBranch size={14} />
            </a>
            <a
              href="https://x.com/V_J_S_1"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              aria-label="X"
            >
              <XIcon size={14} />
            </a>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="nav-link"
              aria-label="Toggle color theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
