// next.config.js
const withPlugins = require('next-compose-plugins');
const nextPwa = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const customRuntimeCaching = runtimeCaching.map((entry) => {
  const newEntry = { ...entry };

  if (entry.options.cacheName === 'cross-origin') {
    // NetworkOnly for cross-origin requests
    newEntry.handler = 'NetworkOnly';

    delete newEntry.options.networkTimeoutSeconds;
  }

  return newEntry;
});

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svgrc$/,
      use: '@svgr/webpack',
    });

    return config;
  },
};

const bundleAnalyzer = require('@next/bundle-analyzer')({
  // enabled: process.env.ANALYZE === 'true',
  enabled: false,
});

const plugins = [
  bundleAnalyzer,
  [
    nextPwa,
    {
      pwa: {
        dest: 'public',
        // disable: process.env.NODE_ENV === 'development',
        importScripts: [
          'https://s3-eu-west-1.amazonaws.com/static.wizrocket.com/js/sw_webpush.js',
        ],
        buildExcludes: [
          /\.map$/, // dont cache map files
        ],
        reloadOnOnline: false,
        runtimeCaching: customRuntimeCaching,
      },
    },
  ],
];

module.exports = withPlugins(plugins, nextConfig);
