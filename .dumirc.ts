import { defineConfig } from 'dumi';
import { resolve } from 'path';

let isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  base: '/',
  publicPath: '/',
  runtimePublicPath: {},
  hash: true,
  // favicons: ['/logo.png'],
  outputPath: 'docs-dist',
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  alias: {
    '@orca-fe/demo-comp': resolve('packages', 'demo-comp', 'src'),
    '@orca-fe/intl': resolve('packages', 'intl', 'src'),
  },

  resolve: {
    atomDirs: [
      { type: 'components/demo-comp', dir: 'packages/demo-comp/docs' },
      { type: 'components/intl', dir: 'packages/intl/docs' },
    ],
  },

  themeConfig: {
    name: 'orca-intl',
    // logo: '/orca-logo.png',
    // socialLinks: {
    //   github: 'https://github.com/orca-team/pocket',
    // },
  },
  extraBabelIncludes: [/\.md/],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  styles: [
    `
  body .dumi-default-hero-title { font-size: 100px; }
  body .dumi-default-sidebar { width: 230px; }
  .dumi-default-navbar { white-space: nowrap; }
  body .dumi-default-header-left { width: 230px; }
  `,
  ],
});
