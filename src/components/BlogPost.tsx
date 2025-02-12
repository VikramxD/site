import React from 'react';

interface BlogPostProps {
  title: string;
  date: string;
  preview: string;
  isNew: boolean;
}

const BlogPost = ({ title, date, preview, isNew }: BlogPostProps) => {
  return (
    <article className="timeline pl-8 pb-8">
      <div className={`timeline-dot ${isNew ? 'new' : ''}`} />
      <div>
        <div className="flex items-center gap-2 mb-1">
          {isNew && <span className="new-tag">New</span>}
          <h2 className="blog-title">{title}</h2>
          <time className="blog-date">{date}</time>
        </div>
        <p className="blog-preview">{preview}</p>
      </div>
    </article>
  );
};

export default BlogPost;