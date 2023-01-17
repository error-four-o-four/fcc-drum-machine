import { resolve } from 'path';
import { unlinkSync } from 'fs';
import { defineConfig } from 'vite';

import postcssNesting from 'postcss-nesting';
import postcssCustomMedia from 'postcss-custom-media';

function cssOnly() {
  let filePath;

  return {
    name: 'css-only',
    generateBundle({ dir }, files) {
      filePath = resolve(dir, Object.keys(files)[0]);
    },
    closeBundle() {
      console.log(`Cleaning ...\n`);
      try {
        unlinkSync(filePath);
      } catch (error) {
        console.log(error);
      }
    },
  };
}

export default defineConfig({
  base: './',
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, '../src/assets/reset/reset.css'),
      name: 'reset',
      filename: 'reset',
      formats: ['es'],
    },
    outDir: './public/reset/',
    rollupOptions: {
      output: {
        assetFileNames: 'reset.min.css',
      },
    },
  },
  css: {
    postcss: {
      plugins: [postcssCustomMedia(), postcssNesting()],
    },
  },
  plugins: [cssOnly()],
});
