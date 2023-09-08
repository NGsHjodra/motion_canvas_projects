import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        './src/projects/testing.ts',
        './src/projects/radix_sort.ts',
        './src/projects/count_sort.ts',
      ],
    }),
    ffmpeg(),
  ],
});
