import postsData from '../content/posts.json';

export interface Post {
  id: string;
  title: string;
  date: string;
  preview: string;
  content: string;
  isNew?: boolean;
}

export function getAllPosts(): Post[] {
  return postsData as Post[];
} 