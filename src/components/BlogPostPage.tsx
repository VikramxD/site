import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components, ExtraProps } from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { useParams, Link } from 'react-router-dom';
import CopyButton from './CopyButton';
import LatexCopyButton from './LatexCopyButton';
import TableOfContents, { TOCHeading } from './TableOfContents';
import { slugifyHeading } from '../utils/slugify';
import { attachLatexData } from '../utils/attachLatexData';

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
  const post = posts.find((p) => p.id === id);

  const processedContent = useMemo(() => {
    if (!post) {
      return '';
    }

    return post.content
      .replace(/^---[\s\S]*?---\n/, '')
      .replace(/^#\s+.*(?:\r?\n|\r)/, '')
      .trim();
  }, [post]);

  const headings = useMemo<TOCHeading[]>(() => {
    const matches = processedContent.matchAll(/^#{2,3}\s+(.+)$/gm);
    const items: TOCHeading[] = [];
    const slugCounts = new Map<string, number>();
    let index = 0;

    for (const match of matches) {
      index += 1;
      const full = match[0];
      const level = full.match(/^#+/)?.[0].length ?? 0;

      if (level < 2 || level > 3) {
        continue;
      }

      const rawText = match[1].replace(/[`*_~]/g, '').trim();
      const baseSlug = slugifyHeading(rawText || `section-${index}`);
      const count = slugCounts.get(baseSlug) ?? 0;
      slugCounts.set(baseSlug, count + 1);
      const slug = count === 0 ? baseSlug : `${baseSlug}-${count}`;

      items.push({
        id: slug,
        text: rawText || `Section ${index}`,
        level,
      });
    }

    return items;
  }, [processedContent]);

  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    setActiveId(headings[0]?.id ?? null);
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headingElements.length === 0) {
      return;
    }

    const handleScroll = () => {
      const offset = 140;
      let current: string | null = headings[0]?.id ?? null;

      for (const element of headingElements) {
        const { top } = element.getBoundingClientRect();
        if (top - offset <= 0) {
          current = element.id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [headings]);

  const getTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map(getTextFromChildren).join('');
    }

    if (typeof children === 'object' && children !== null && 'props' in children) {
      return getTextFromChildren(children.props.children);
    }

    return '';
  };

  let headingCursor = -1;

  const renderHeading = (Tag: 'h2' | 'h3', level: number) =>
    ({ children }: { children?: React.ReactNode }) => {
      const text = getTextFromChildren(children).trim();
      let headingMatch: TOCHeading | undefined;

      for (let i = headingCursor + 1; i < headings.length; i += 1) {
        if (headings[i].level === level) {
          headingCursor = i;
          headingMatch = headings[i];
          break;
        }
      }

      const baseId = slugifyHeading(text || 'section');
      const id = headingMatch?.id ?? baseId;

      return (
        <Tag id={id} className="group flex items-center gap-2 font-semibold">
          <span>{children}</span>
          <a href={`#${id}`} className="anchor-link" aria-label={`Jump to ${text || 'section'}`}>
            #
          </a>
        </Tag>
      );
    };

  if (!post) {
    return <div>Post not found</div>;
  }

  const extractLatex = (element: React.ReactNode): string => {
    if (typeof element === 'string') {
      return element;
    }

    if (Array.isArray(element)) {
      return element.map(extractLatex).join('');
    }

    if (React.isValidElement(element) && element.props?.children) {
      return extractLatex(element.props.children);
    }

    return '';
  };

  type CodeProps = React.ComponentProps<'code'> & ExtraProps & { inline?: boolean };

  const getLatexFromElement = (element?: ExtraProps['node']): string | null => {
    const raw = element?.properties?.['data-latex'];
    return typeof raw === 'string' ? raw : null;
  };

  const hasClass = (className: string | undefined, target: string): boolean =>
    className?.split(/\s+/).includes(target) ?? false;

  const mergeClassNames = (...classNames: Array<string | undefined>): string =>
    classNames.filter(Boolean).join(' ');

  const renderMathBlock: Components['div'] = ({ className, children, node, ...rest }) => {
    if (!hasClass(className, 'math-display')) {
      return (
        <div className={className} {...rest}>
          {children}
        </div>
      );
    }

    const latexSource = getLatexFromElement(node) ?? extractLatex(children);
    const combinedClassName = mergeClassNames(className, 'math-snippet-container group');

    return (
      <div className={combinedClassName} {...rest}>
        <span className="math-snippet-label">LaTeX</span>
        <div className="math-snippet-block">{children}</div>
        <LatexCopyButton latex={latexSource ?? ''} />
      </div>
    );
  };

  const renderMathInline: Components['span'] = ({ className, children, node, ...rest }) => {
    if (!hasClass(className, 'math-inline')) {
      return (
        <span className={className} {...rest}>
          {children}
        </span>
      );
    }

    const latexSource = getLatexFromElement(node) ?? extractLatex(children);
    const combinedClassName = mergeClassNames(className, 'math-inline-snippet group inline-flex items-center gap-2');

    return (
      <span className={combinedClassName} {...rest}>
        <span className="math-inline-content">{children}</span>
        <LatexCopyButton latex={latexSource ?? ''} variant="inline" />
      </span>
    );
  };

  const markdownComponents: Components = {
    h2: renderHeading('h2', 2),
    h3: renderHeading('h3', 3),
    code: (({ inline, className, children, ...rest }: CodeProps) => {
      const { node, ...codeProps } = rest;
      void node;
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const codeString = String(children ?? '').replace(/\n$/, '');

      if (!inline && className) {
        const languageLabel = language ? language.toUpperCase() : null;
        return (
          <div className="code-snippet-container group">
            {languageLabel && <span className="code-snippet-label">{languageLabel}</span>}
            <pre className="code-snippet-block" data-language={language}>
              <code className={className}>{codeString}</code>
            </pre>
            <CopyButton code={codeString} />
          </div>
        );
      }

      return (
        <code className={className} {...codeProps}>
          {children}
        </code>
      );
    }) satisfies Components['code'],
    div: renderMathBlock,
    span: renderMathInline,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col xl:flex-row xl:items-start xl:gap-12">
        <div className="flex-1 max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/blogs"
              className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              ← All Posts
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <Link
              to="/"
              className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Home
            </Link>
          </div>

          <article>
            <header className="mb-12">
              <h1 className="text-3xl font-extrabold mb-8 tracking-tight">{post.title}</h1>
              <div className="space-y-2 font-mono text-[12px] text-slate-500 dark:text-slate-400">
                <div className="flex">
                  <div className="w-32">Published</div>
                  <div className="text-slate-900 dark:text-slate-100">{post.date}</div>
                </div>
                {post.email && (
                  <div className="flex">
                    <div className="w-32">Email</div>
                    <a
                      href={`mailto:${post.email}`}
                      className="border-b border-dotted border-gray-500 hover:border-gray-900 dark:hover:border-gray-100"
                    >
                      {post.email}
                    </a>
                  </div>
                )}
                {post.repo && (
                  <div className="flex">
                    <div className="w-32">Repo</div>
                    <a
                      href={post.repo.startsWith('http') ? post.repo : `https://github.com/${post.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-dotted border-gray-500 hover:border-gray-900 dark:hover:border-gray-100"
                    >
                      {post.repo}
                    </a>
                  </div>
                )}
              </div>
            </header>

            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm, attachLatexData]}
                rehypePlugins={[rehypeKatex]}
                components={markdownComponents}
              >
                {processedContent}
              </ReactMarkdown>
            </div>
          </article>
        </div>

        <TableOfContents headings={headings} activeId={activeId} />
      </div>
    </div>
  );
};
