import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { useParams, Link } from 'react-router-dom';
import CopyButton from './CopyButton';

interface BlogPostPageProps {
  posts: {
    id: string;
    title: string;
    date: string;
    content: string;
    email?: string;
    repo?: string;
  }[];
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Process the content to remove frontmatter and title
  const processedContent = post.content
    .replace(/^---[\s\S]*?---\n/, '') // Remove frontmatter
    .replace(/^#\s+.*(?:\r?\n|\r)/, '') // Remove title heading
    .trim();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-8"
      >
        ← Back to Home
      </Link>
      
      <article>
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold mb-8 tracking-tight">{post.title}</h1>
          <div className="space-y-2 font-mono text-[13px]">
            <div className="flex">
              <div className="w-32 text-gray-500 dark:text-gray-400">Published</div>
              <div>{post.date}</div>
            </div>
            {post.email && (
              <div className="flex">
                <div className="w-32 text-gray-500 dark:text-gray-400">Email</div>
                <a href={`mailto:${post.email}`} className="border-b border-dotted border-gray-500 hover:border-gray-900 dark:hover:border-gray-100">
                  {post.email}
                </a>
              </div>
            )}
            {post.repo && (
              <div className="flex">
                <div className="w-32 text-gray-500 dark:text-gray-400">Repo</div>
                <a href={post.repo.startsWith('http') ? post.repo : `https://github.com/${post.repo}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="border-b border-dotted border-gray-500 hover:border-gray-900 dark:hover:border-gray-100">
                  {post.repo}
                </a>
              </div>
            )}
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                const codeString = String(children).replace(/\n$/, '');
                
                if (className) {
                  return (
                    <div className="relative">
                      <SyntaxHighlighter
                        style={oneDark}
                        language={language}
                        PreTag="div"
                        customStyle={{
                          margin: '1.5em 0',
                          borderRadius: '0.375rem',
                          background: '#1a1a1a'
                        }}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                      <CopyButton code={codeString} />
                    </div>
                  );
                }
                return <code className={className}>{children}</code>;
              }
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}; 