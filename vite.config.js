import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         components: path.resolve('src/components/'),
         constant: path.resolve('src/constant/'),
         context: path.resolve('src/context/'),
         hooks: path.resolve('src/hooks/'),
         pages: path.resolve('src/pages/'),
         routes: path.resolve('src/routes/'),
         styles: path.resolve('src/styles/'),
         util: path.resolve('src/util/')
      }
   }
});
