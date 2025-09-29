import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogPost from './BlogPost';
import { Post } from '../utils/posts';

interface BlogsPageProps {
  posts: Post[];
}

const BlogsPage: React.FC<BlogsPageProps> = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  // Reset to page 1 when posts change
  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Previous page"
      >
        ←
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 text-sm border rounded transition-colors ${
            i === currentPage
              ? 'bg-blue-500 text-white border-blue-500'
              : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Next page"
      >
        →
      </button>
    );

    return buttons;
  };

  return (
    <main className="container flex-grow py-12">
      <div className="max-w-[650px] mx-auto">
        <div className="mb-16">
          <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            All Blog Posts
          </h1>
          <p className="text-[15px] leading-[1.6] text-slate-600 dark:text-slate-300 mb-6">
            A collection of my thoughts, experiments, and insights from working with AI systems.
            Browse through {posts.length} posts covering everything from technical deep-dives to practical implementation guides.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              ← Back to Home
            </Link>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-slate-500 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing {startIndex + 1}-{Math.min(endIndex, posts.length)} of {posts.length} posts
              </p>
            </div>

            <div className="timeline-list">
              {currentPosts.map((post, index) => (
                <div key={post.id} className="block">
                  <BlogPost
                    post={post}
                    isFirst={currentPage === 1 && index === 0}
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {renderPaginationButtons()}
              </div>
            )}

          </>
        )}
      </div>
    </main>
  );
};

export default BlogsPage;
