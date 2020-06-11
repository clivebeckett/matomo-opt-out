import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'matomoTrackingOptOut.js',
    plugins: [babel(), terser()],
    output: {
      sourcemap: false,
      file: 'matomoTrackingOptOut.min.js',
      format: 'iife',
    },
  },
];
