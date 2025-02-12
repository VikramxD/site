import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header = ({ theme, setTheme }: HeaderProps) => {
  return (
    <header className="py-6 mb-12">
      <nav className="container" aria-label="Top">
        <div className="flex items-center justify-between">
          <a href="/" className="font-['EB_Garamond'] text-2xl text-gray-900 dark:text-gray-100">
            Physical Intelligence (π)
          </a>
          <div className="flex items-center gap-8">
            <a href="/home" className="nav-link">Home</a>
            <a href="/research" className="nav-link">Research</a>
            <a href="/join-us" className="nav-link">Join Us</a>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-gray-100" />
              ) : (
                <Moon className="w-4 h-4 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;