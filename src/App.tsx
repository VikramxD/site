import React, { useEffect, useState } from 'react';
import BlogPost from './components/BlogPost';
import Header from './components/Header';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const posts = [
    {
      id: 1,
      title: "Open Sourcing π₀",
      date: "February 4, 2025",
      preview: "We are releasing the weights and code for π₀ as well as our new π₀-FAST autoregressive model.",
      isNew: true
    },
    {
      id: 2,
      title: "FAST: Efficient Robot Action Tokenization",
      date: "January 16, 2025",
      preview: "A new robot action tokenizer that allows us to train generalist policies 5x faster than previous models.",
      isNew: false
    },
    {
      id: 3,
      title: "π₀: Our First Generalist Policy",
      date: "October 31, 2024",
      preview: "Our first generalist policy, π₀, a prototype model that combines large-scale multi-task and multi-robot data collection with a new network architecture to enable the most capable and dexterous generalist robot policy to date.",
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-dark-900">
      <Header theme={theme} setTheme={setTheme} />
      
      <main className="container">
        <p className="text-[13px] leading-[1.4] mb-12 text-gray-600 dark:text-gray-300">
          Physical Intelligence is bringing general-purpose AI into the physical world. We are a group of engineers, scientists, roboticists, and company builders developing foundation models and learning algorithms to power the robots of today and the physically-actuated devices of the future.
        </p>

        <div>
          {posts.map(post => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;