

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Feature Flags for Laravel',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "Feature Flags for Laravel Package documentation",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'ylsideas/features-flags',
    editLinks: true,
    displayAllHeaders: true,
    docsDir: '',
    repoLabel: 'GitHub',
    docsRepo: 'ylsideas/features-flags-docs',
    editLinkText: 'Edit',
    lastUpdated: false,
    smoothScroll: true,
    nav: [
      {
        text: 'Fund',
        link: 'https://github.com/sponsors/peterfox'
      }
    ],
    sidebar: {
      '/': [
        {
          title: 'Introduction',
          sidebarDepth: 3,
          path: '/'
        },
        {
          title: 'Installation',
          sidebarDepth: 3,
          path: '/installation/'
        },
        {
          title: 'Configuration',
          sidebarDepth: 2,
          path: '/configuration/'
        },
        {
          title: 'Usage',
          sidebarDepth: 3,
          path: '/usage/'
        },
      ]
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
