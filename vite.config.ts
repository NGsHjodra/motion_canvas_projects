import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        './src/projects/bubble_sort.ts',
        './src/projects/ngs_spline.ts',
        './src/projects/insertion_sort.ts',
        './src/projects/testing.ts',
      ],
    }),
    ffmpeg(),
  ],
});
