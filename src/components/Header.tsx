import React from 'react';
import { Link } from 'react-router-dom';
import { Github, FileText, Sun, Moon } from 'lucide-react';
import XIcon from './XIcon';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="container py-8">
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-[15px] font-normal">
            Applied Mode (△)
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://docs.google.com/document/d/1A8KGNkAtYyi4zIxSFWQ_mwBqhbXn8Pu_qbSNzDHwaws/edit?tab=t.0" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="nav-link"
             aria-label="Resume">
            <FileText size={14} />
          </a>
          <a href="https://github.com/VikramxD" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="nav-link"
             aria-label="GitHub">
            <Github size={14} />
          </a>
          <a href="https://x.com/V_J_S_1" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="nav-link"
             aria-label="X">
            <XIcon size={14} />
          </a>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="nav-link"
            aria-label="Toggle theme">
            {theme === 'light' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;