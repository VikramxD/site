import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogPost from './components/BlogPost';
import Header from './components/Header';
import Footer from './components/Footer';
import { BlogPostPage } from './components/BlogPostPage';
import { getAllPosts, Post } from './utils/posts';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Add initial dark mode setup
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    // Load posts
    const loadedPosts = getAllPosts();
    // Mark the most recent post as new
    if (loadedPosts.length > 0) {
      loadedPosts[0].isNew = true;
    }
    setPosts(loadedPosts);
  }, [lastUpdate]); // Reload when lastUpdate changes

  // In development, check for updates periodically
  useEffect(() => {
    if (import.meta.env.DEV) {
      const interval = setInterval(() => {
        setLastUpdate(Date.now());
      }, 1000); // Check every second in development
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <Header theme={theme} setTheme={setTheme} />
        
        <main className="container flex-grow">
          <div className="mb-16 max-w-[650px]">
            <p className="text-[15px] leading-[1.6] text-gray-900 dark:text-gray-100 mb-4">
              Hi, I'm Vikram! I am Machine Learning Operations Engineer.
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

          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={
                <div className="timeline">
                  {posts.map((post) => (
                    <Link key={post.id} to={`/post/${post.id}`} className="block">
                      <BlogPost
                        title={post.title}
                        date={post.date}
                        preview={post.preview}
                        isNew={post.isNew}
                      />
                    </Link>
                  ))}
                </div>
              } />
              <Route path="/post/:id" element={<BlogPostPage posts={posts} />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;