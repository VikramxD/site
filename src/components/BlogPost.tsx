import { Link } from 'react-router-dom';

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    date: string;
    preview: string;
    isNew?: boolean;
  };
  isFirst?: boolean;
}

const BlogPost = ({ post, isFirst = false }: BlogPostProps) => {
  const baseClasses = ['timeline-entry', 'group', 'cursor-pointer'];
  if (isFirst) {
    baseClasses.push('timeline-entry-first');
  }

  return (
    <Link to={`/blog/${post.id}`} className="block">
      <article className={baseClasses.join(' ')}>
        <div className="timeline-dot" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            {post.isNew && (
              <span className="text-[12px] font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">
                New
              </span>
            )}
            <h2 className="blog-title group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <time className="blog-date">{post.date}</time>
          </div>
          <p className="blog-preview">{post.preview}</p>
        </div>
      </article>
    </Link>
  );
};

export default BlogPost;
