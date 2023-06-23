import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import ffmpeg from '@motion-canvas/ffmpeg';

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        // './src/projects/bubble_sort.ts',
        // './src/projects/ngs_spline.ts',
        // './src/projects/insertion_sort.ts',
        './src/projects/testing.ts',
        // './src/projects/wordle.ts',
        './src/projects/cassette_player_intro.ts',
        './src/projects/thunder.ts',
      ],
    }),
    ffmpeg(),
  ],
});
