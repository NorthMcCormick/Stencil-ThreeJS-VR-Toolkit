import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [{
    type: 'www',
    serviceWorker: null
  }],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  devServer: {
    address: '0.0.0.0'
  },
  copy: [
    { src: '../node_modules/webvr-polyfill/build/webvr-polyfill.js', dest: 'assets/js/webvr-polyfill.js' },
  ]
};
