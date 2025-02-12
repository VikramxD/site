import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="container py-8 mt-16 border-t border-gray-200 dark:border-gray-800">
      <nav className="flex items-center justify-between">
        <Link to="/" className="text-[15px] font-normal">
          Applied Mode (△)
        </Link>
        
        <div className="flex items-center gap-6">
          <a href="https://docs.google.com/document/d/1A8KGNkAtYyi4zIxSFWQ_mwBqhbXn8Pu_qbSNzDHwaws/edit?tab=t.0" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="nav-link">
            Resume
          </a>
          <a href="https://github.com/VikramxD" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="nav-link">
            GitHub
          </a>
          <a href="https://x.com/V_J_S_1" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="nav-link">
            X
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer; 