const dev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['styled-components', { ssr: true, displayName: dev }],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@pages': './src/pages',
          '@components': './src/components',
          css: './src/css',
          constants: './src/constants',
          style: './src/style',
          utils: './src/utils',
          '@hooks': './src/hooks',
          '@lib': './src/lib',
        },
      },
    ],
  ],
};
