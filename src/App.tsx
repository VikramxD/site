import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
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
        
        <Routes>
          <Route path="/" element={<HomePage posts={posts} />} />
          <Route path="/blog/:id" element={<BlogPostPage posts={posts} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;