import { babel } from '@rollup/plugin-babel';

const config = {
  input: './index.js',
  output: {
	file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [babel({ babelHelpers: 'bundled' })]
};

export default config;