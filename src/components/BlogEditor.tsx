import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import remarkGfm from 'remark-gfm';

interface BlogEditorProps {
  onSave: (post: { title: string; content: string; preview: string }) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [preview, setPreview] = useState('');

  const handleSave = () => {
    onSave({
      title,
      content,
      preview: preview || content.slice(0, 200) + '...' // Default preview if not provided
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full px-4 py-2 text-[15px] bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-yellow-400"
        />
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          placeholder="Preview text (optional)"
          className="w-full px-4 py-2 text-[15px] bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-yellow-400"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsPreview(false)}
          className={`px-4 py-2 text-[13px] ${!isPreview ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Edit
        </button>
        <button
          onClick={() => setIsPreview(true)}
          className={`px-4 py-2 text-[13px] ${isPreview ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Preview
        </button>
      </div>

      {!isPreview ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post in Markdown. LaTeX equations supported between $$ $$"
          className="w-full h-[500px] p-4 text-[15px] bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:border-yellow-400 font-mono"
        />
      ) : (
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-yellow-400 text-black rounded-lg text-[13px] hover:bg-yellow-500 transition-colors"
        >
          Save Post
        </button>
      </div>
    </div>
  );
};

export default BlogEditor; 