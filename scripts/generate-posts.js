import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDirectory = path.join(path.dirname(__dirname), 'src/content/posts');
const outputFile = path.join(path.dirname(__dirname), 'src/content/posts.json');

function generatePosts() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Format the date
      const date = new Date(matterResult.data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Combine the data with the id
      return {
        id,
        title: matterResult.data.title,
        date,
        preview: matterResult.data.preview,
        content: matterResult.content,
        email: matterResult.data.email,
        repo: matterResult.data.repo,
      };
    });

  // Sort posts by date
  const sortedPosts = allPosts.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });

  // Write the result to a JSON file
  fs.writeFileSync(outputFile, JSON.stringify(sortedPosts, null, 2));
  console.log('Posts generated successfully!');
}

generatePosts(); 