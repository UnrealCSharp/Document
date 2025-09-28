// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'UnrealCSharp',
  tagline: '基于.NET 8（Mono）的UE下C#编程插件',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://unrealcsharp.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'UnrealCSharp', // Usually your GitHub org/user name.
  projectName: 'UnrealCSharp.github.io', // Usually your repo name.
  deploymentBranch: 'Docusaurus',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'UnrealCSharp',
        logo: {
          alt: 'UnrealCSharp Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'documentSidebar',
            position: 'left',
            label: '文档',
          },
          {
            type: 'docSidebar',
            sidebarId: 'communitySidebar',
            position: 'left',
            label: '社区',
          },
          {
            type: 'docSidebar',
            sidebarId: 'updateSidebar',
            position: 'left',
            label: '更新',
          },
          {
            href: 'https://github.com/crazytuzi/UnrealCSharp',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} UnrealCSharp. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["csharp"]
      },
      algolia: {
        // The application ID provided by Algolia
        appId: '8NTM3K2LS3',
        // Public API key: it is safe to commit it
        apiKey: 'fb4452f34ab967b1f15400fb9560939e',
        indexName: 'unrealcsharpio',
      },
    }),
  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
    experimental_faster: {
      ssgWorkerThreads: true,
      rspackBundler: true,
      rspackPersistentCache: true,
    },
  },
};

export default config;
