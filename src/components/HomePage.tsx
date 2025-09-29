import React from 'react';
import BlogPost from './BlogPost';
import { Post } from '../utils/posts';

interface HomePageProps {
  posts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <main className="container flex-grow py-12">
      <div className="mb-16 max-w-[650px]">
        <div className="mb-6">
          <p className="text-[15px] leading-[1.6] text-slate-900 dark:text-slate-100 mb-4">
            Hi, I'm Vikram 👋
          </p>
            <p className="text-[15px] leading-[1.6] text-slate-600 dark:text-slate-300 mb-4">
              I craft robust systems that turn cutting-edge models into reliable production tools, particularly in areas like computer vision, audio processing, and generative diffusion techniques. My approach centers on streamlining inference for speed and efficiency, maximizing hardware potential, and ensuring seamless scalability without unnecessary overhead.
            </p>
            <p className="text-[15px] leading-[1.6] text-slate-600 dark:text-slate-300 mb-6">
              At Dreamflux, I'm building AI-driven characters that evolve through layered memory structures, creating multi-agent environments where narratives unfold organically with spatial intelligence and adaptive roles. This builds on prior ventures, such as orchestrating serverless diffusion workflows for consistent character rendering and rapid video enhancements at Playjump, or tailoring compact language models for intuitive travel recommendations at Lossfunk—each project honing my knack for blending experimentation with deployable precision.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-600 p-4 mb-6 rounded-r-lg">
              <p className="text-[14px] leading-[1.6] text-amber-700 dark:text-amber-300">
                🧪 <strong>Active interests:</strong>
              </p>
              <ul className="text-[14px] leading-[1.6] text-amber-700 dark:text-amber-300 mt-2 space-y-1">
                <li><strong>Extending ComfyUI</strong> with advanced temporal upscalers for fluid video restoration</li>
                <li><strong>Engineering lightweight APIs</strong> that harness diffusion for narrative visuals</li>
                <li><strong>Diving deep into memory research papers</strong> to understand long-term contextual retention in AI systems</li>
                <li><strong>Exploring 3D avatar generation</strong> bridging 2D diffusion models with volumetric representations</li>
                <li><strong>Tackling text-to-shader and image-to-shader pipelines</strong> that transform natural language and visuals into programmable graphics code</li>
              </ul>
              <p className="text-[13px] leading-[1.6] text-amber-600 dark:text-amber-400 mt-3 italic">
                These pursuits reveal how constraints often spark the most innovative architectures.
              </p>
            </div>
            <p className="text-[15px] leading-[1.6] text-slate-600 dark:text-slate-300">
              Welcome to my digital rant garden. 🚀
            </p>
        </div>
      </div>
      <div className="max-w-[650px]">
        <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">
          Recent Posts
        </h2>
        <div className="timeline-list">
          {posts.map((post, index) => (
            <BlogPost
              key={post.id}
              post={post}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage; 
