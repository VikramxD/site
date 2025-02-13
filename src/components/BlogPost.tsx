import React from 'react';

interface BlogPostProps {
  title: string;
  date: string;
  preview: string;
  isNew?: boolean;
}

const BlogPost = ({ title, date, preview, isNew }: BlogPostProps) => {
  return (
    <article className="timeline">
      <div className="timeline-dot" />
      <div>
        <div className="flex items-center gap-2 mb-2">
          {isNew && (
            <span className="text-[12px] font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">
              New
            </span>
          )}
          <h2 className="blog-title">{title}</h2>
          <time className="blog-date">{date}</time>
        </div>
        <p className="blog-preview">{preview}</p>
      </div>
    </article>
  );
};

export default BlogPost;