import {Config} from '@stencil/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [{
    type: 'www',
    serviceWorker: null,
    baseUrl: "https://127.0.0.1:5655"
  }],
  plugins: [
    nodePolyfills(),
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css'
};
