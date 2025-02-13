import postsData from '../content/posts.json';

export interface Post {
  id: string;
  title: string;
  date: string;
  preview: string;
  content: string;
  email?: string;
  repo?: string;
  isNew?: boolean;
}

export function getAllPosts(): Post[] {
  return postsData as Post[];
} 