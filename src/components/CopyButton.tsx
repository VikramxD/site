import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  code: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ code, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonClasses =
    className ?? `absolute top-3 right-3 p-1.75 rounded-md border border-slate-400/60
    bg-white/95 text-slate-700 shadow-sm hover:bg-white
    dark:border-slate-500/50 dark:bg-slate-800/85 dark:text-slate-100 dark:hover:bg-slate-700/85
    transition-all duration-200 z-20 opacity-80
    hover:opacity-100 group-hover:opacity-100
    hover:scale-110 focus-visible:opacity-100`;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={buttonClasses}
      aria-label="Copy code"
    >
      {copied ? (
        <Check size={12} className="text-green-400" />
      ) : (
        <Copy size={12} />
      )}
    </button>
  );
};

export default CopyButton; 
