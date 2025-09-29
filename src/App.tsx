import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlogsPage from './components/BlogsPage';
import { BlogPostPage } from './components/BlogPostPage';
import MainLayout from './components/MainLayout';
import { getAllPosts, Post } from './utils/posts';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [theme]);

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
      <Routes>
        <Route
          path="/"
          element={<MainLayout theme={theme} setTheme={setTheme} posts={posts} Component={HomePage} showFooter />}
        />
        <Route
          path="/blogs"
          element={<MainLayout theme={theme} setTheme={setTheme} posts={posts} Component={BlogsPage} />}
        />
        <Route
          path="/blog/:id"
          element={<MainLayout theme={theme} setTheme={setTheme} posts={posts} Component={BlogPostPage} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
