import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface LatexCopyButtonProps {
  latex: string;
  variant?: 'block' | 'inline';
}

const blockClasses = `absolute top-3 right-3 flex items-center justify-center rounded-md border
border-slate-400/60 bg-white text-slate-700 shadow-sm
hover:bg-slate-100 dark:border-slate-500/50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700
transition-all duration-200 z-30 opacity-100 focus-visible:opacity-100
focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white
dark:focus-visible:ring-slate-500/70 dark:focus-visible:ring-offset-slate-900/80`;

const inlineClasses = `relative ml-2 inline-flex items-center justify-center rounded-md border border-slate-200
bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700
dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
transition-all duration-200 opacity-100 p-1.5`;

const LatexCopyButton: React.FC<LatexCopyButtonProps> = ({ latex, variant = 'block' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const className = variant === 'block' ? blockClasses : inlineClasses;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      aria-label="Copy LaTeX equation"
    >
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
    </button>
  );
};

export default LatexCopyButton;
