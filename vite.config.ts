import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { exec } from 'child_process';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'watch-md',
      configureServer(server) {
        server.watcher.add('src/content/posts/*.md');
        server.watcher.on('change', (file) => {
          if (file.endsWith('.md')) {
            exec('node scripts/generate-posts.js', (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error}`);
                return;
              }
              console.log(stdout);
              // Trigger HMR for posts.json
              server.moduleGraph.invalidateAll();
              server.ws.send({ type: 'full-reload' });
            });
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
