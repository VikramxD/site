import React, { useState } from 'react';

interface CopyButtonProps {
  code: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 px-2 py-1 text-xs rounded-md 
                 bg-gray-800 text-gray-300 hover:bg-gray-700 
                 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
                 transition-colors duration-200"
      aria-label="Copy code"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton; 