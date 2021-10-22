
/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const webpack = require('webpack')

const githubUrl = 'https://github.com/refinery-labs/lunasec-monorepo' // restart the server if you change this
const quotedGithubUrl = `"${githubUrl}"`

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'LunaSec',
  tagline: 'Data security from the start.',
  url: 'https://www.lunasec.io/',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: true,
  favicon: 'https://uploads-ssl.webflow.com/60e63e8b40f27c7913def7a1/6112d961cd68c3de06afe04d_WebFlow%20Logo%20-%2032px.png',
  organizationName: 'lunasec-io', // Usually your GitHub org/user name.
  projectName: 'lunasec-io.github.io', // Usually your repo name.
  // scripts: ['https://cdn.jsdelivr.net/npm/redoc@v2.0.0-rc.54/bundles/redoc.standalone.js'],
  plugins: [
    function webpackDefine(context, options) {
      return {
        name: 'webpack-define',
        configureWebpack(config, isServer, utils) {
          return {
           plugins: [ // yo I heard you like plugins so I put a plugin in your plugin
             new webpack.DefinePlugin({
               GITHUB_URL: quotedGithubUrl
             })
           ]
          };
        },
      };
    },
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'typedoc-react-sdk',
        entryPoints: ['../js/sdks/packages/react-sdk/src/types/component-types.ts'],
        defaultCategory:'Component',
        tsconfig: '../js/sdks/packages/react-sdk/tsconfig.json',
        watch: process.env.TYPEDOC_WATCH,
        // Without this, our URL becomes `lunasec.io/docs/docs`. I prefer `lunasec.io/docs/pages`.
        docsRoot: 'pages',
        out: 'react-sdk',
        sidebar: {
          categoryLabel: "React SDK"
        },
        excludePrivate:true,
        readme: 'none',
        sort: ['required-first', 'source-order']
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'typedoc-node-sdk',
        entryPoints: ['../js/sdks/packages/node-sdk/src/index.ts'],
        tsconfig: '../js/sdks/packages/node-sdk/tsconfig.json',
        watch: process.env.TYPEDOC_WATCH,
        // Without this, our URL becomes `lunasec.io/docs/docs`. I prefer `lunasec.io/docs/pages`.
        docsRoot: 'pages',
        out: 'node-sdk',
        sidebar: {
          categoryLabel: "Node SDK"
        },
        excludePrivate:true,
        readme: 'none',
        sort: ['required-first', 'source-order']
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'typedoc-tokenizer',
        entryPoints: ['../js/sdks/packages/tokenizer-sdk/src/index.ts'],
        tsconfig: '../js/sdks/packages/tokenizer-sdk/tsconfig.json',
        watch: process.env.TYPEDOC_WATCH,
        // Without this, our URL becomes `lunasec.io/docs/docs`. I prefer `lunasec.io/docs/pages`.
        docsRoot: 'pages',
        out: 'tokenizer-sdk',
        sidebar: {
          categoryLabel: "Tokenizer SDK"
        },
        excludePrivate:true,
        readme: 'none',
        sort: ['required-first', 'source-order'],
        exclude:['**/generated/**/*']
      },
    ],
  ],
  themeConfig: {
    algolia: {
      apiKey: '3021482545ed8ba09aebac40e2eccccd',
      indexName: 'lunasec',
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: see doc section below
      appId: 'BH4D9OD16A',
      // Optional: Algolia search parameters
      searchParameters: {},
      //... other Algolia params
    },
    navbar: {
      logo: {
        alt: 'LunaSec Logo',
        src: '/docs/img/logo-black-text.svg',
        srcDark: '/docs/img/logo-white-text.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'overview/introduction',
          position: 'left',
          label: 'Docs'
        },
        {
          to: '/docs/blog',
          position: 'left',
          label: 'Blog'
        },
        {
          type: 'docsVersionDropdown',
          position: "right"
        },
        {
          href: 'https://github.com/refinery-labs/lunasec-monorepo',
          label: 'GitHub',
          position: 'right'
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
              to: '/docs/pages/intro',
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
              to: '/docs/blog',
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
          path: 'pages',
          routeBasePath: 'pages',
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
        sitemap: {
          changefreq: 'daily',
          priority: 1.0,
        },
      },
    ],
    //Does not work, redoc runtime appears broken, revisit after things are out of beta
    // ['redocusaurus',
    //   {
    //     specs: [{
    //       routePath: '/api-spec/',
    //       specUrl: 'https://redocly.github.io/redoc/openapi.yaml',
    //     }],
    //   }
    // ],
  ],
};
