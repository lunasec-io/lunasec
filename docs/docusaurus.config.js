const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const webpack = require('webpack')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'LunaSec',
  tagline: 'Data security from the start.',
  url: 'https://lunasec.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'lunasec-io', // Usually your GitHub org/user name.
  projectName: 'lunasec-io.github.io', // Usually your repo name.
  scripts: ['https://cdn.jsdelivr.net/npm/redoc@v2.0.0-rc.54/bundles/redoc.standalone.js'],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'typedoc-react-sdk',
        entryPoints: ['../js/sdks/packages/react-sdk/src/index.ts'],
        tsconfig: '../js/sdks/packages/react-sdk/tsconfig.json',
        watch: process.env.TYPEDOC_WATCH,
        out: 'react-sdk',
        sidebar: {
          categoryLabel: "React SDK"
        }
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'typedoc-node-sdk',
        entryPoints: ['../js/sdks/packages/node-sdk/src/index.ts'],
        tsconfig: '../js/sdks/packages/node-sdk/tsconfig.json',
        watch: process.env.TYPEDOC_WATCH,
        out: 'node-sdk',
        sidebar: {
          categoryLabel: "Node SDK"

        }
      },
    ],

  ],
  themeConfig: {
    navbar: {
      title: 'LunaSec',
      logo: {
        alt: 'LunaSec Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/refinery-labs/lunasec-monorepo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/refinery-labs/lunasec-monorepo',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Github',
              href: 'https://github.com/refinery-labs/lunasec-monorepo',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LunaSec. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/refinery-labs/lunasec-monorepo/edit/master/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/refinery-labs/lunasec-monorepo/edit/master/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
    //Does not work, might be possible to fix runtime issue by making our own docusaurus plugin and using webpack provide to fix process.env error
    ['redocusaurus',
      {
        specs: [{
          routePath: '/api-spec/',
          specUrl: 'https://redocly.github.io/redoc/openapi.yaml',
        }],
      }
    ],
  ],
};
