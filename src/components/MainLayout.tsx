import React from 'react';
import Header from './Header';
import Footer from './Footer';
import type { Post } from '../utils/posts';

type RouteComponent = React.ComponentType<{ posts: Post[] }>;

interface MainLayoutProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  posts: Post[];
  Component: RouteComponent;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ theme, setTheme, posts, Component, showFooter = false }) => (
  <div className="flex min-h-screen flex-col bg-white dark:bg-black">
    <Header theme={theme} setTheme={setTheme} />
    <main className="flex flex-1 flex-col">
      <Component posts={posts} />
    </main>
    {showFooter && <Footer />}
  </div>
);

export default MainLayout;
