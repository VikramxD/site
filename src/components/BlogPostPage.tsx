import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { useParams, Link } from 'react-router-dom';
import { TableOfContents } from './TableOfContents';

interface BlogPostPageProps {
  posts: {
    id: string;
    title: string;
    date: string;
    content: string;
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
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">{post.title}</h1>
          <time className="text-gray-500 dark:text-gray-400">{post.date}</time>
        </header>

        <div className="mb-8">
          <TableOfContents content={processedContent} />
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            components={{
              h2: ({ node, children, ...props }) => {
                const id = `heading-${props.index || 0}`;
                return <h2 id={id} {...props}>{children}</h2>;
              },
              h3: ({ node, children, ...props }) => {
                const id = `heading-${props.index || 0}`;
                return <h3 id={id} {...props}>{children}</h3>;
              },
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                
                if (!inline && language) {
                  return (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={language}
                      PreTag="div"
                      customStyle={{
                        margin: '1.5em 0',
                        borderRadius: '0.375rem',
                        background: '#1a1a1a'
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  );
                }
                return <code className={className} {...props}>{children}</code>;
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