import React from 'react';
import { Link } from 'react-router-dom';
import BlogPost from './BlogPost';
import { Post } from '../utils/posts';

interface HomePageProps {
  posts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <main className="container flex-grow">
      <div className="mb-16 max-w-[650px]">
        <p className="text-[15px] leading-[1.6] text-gray-900 dark:text-gray-100 mb-4">
          Hi, I'm Vikram! I am a Machine Learning Operations Engineer.
        </p>
        <p className="text-[15px] leading-[1.6] text-gray-600 dark:text-gray-300 mb-6">
          I work at the intersection of Machine Learning and production systems, specializing in Computer Vision, Diffusion Models, and scaling AI solutions for real-world users. After cutting my teeth at early-stage startups, I'm now focused on building systems that are robust, scalable, and ready for production chaos.
        </p>
        <ul className="text-[15px] leading-[1.6] text-gray-600 dark:text-gray-300 mb-6 list-disc pl-4">
          <li>What I'm learning about deploying ML models at scale</li>
          <li>The challenges of turning research into reality</li>
          <li>Occasional rants about the quirks of building production-grade AI systems</li>
        </ul>
        <p className="text-[15px] leading-[1.6] text-gray-600 dark:text-gray-300 mb-4">
          I'm passionate about open source and believe in building in public—sharing the wins, the failures, and everything in between.
        </p>
        <p className="text-[15px] leading-[1.6] text-gray-600 dark:text-gray-300">
          Welcome to my Digital Rant Garden. 🚀
        </p>
      </div>

      <div className="timeline">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="block">
            <BlogPost
              title={post.title}
              date={post.date}
              preview={post.preview}
              isNew={post.isNew}
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default HomePage; 