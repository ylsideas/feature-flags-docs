import { defineConfig } from 'vitepress'

export default defineConfig({
    // These are app level configs.
    lang: 'en-US',
    title: 'Laravel Feature Flags',
    description: 'The documentation for the Feature Flags for Laravel Package.',

    head: [
        // [
        //     'link',
        //     { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
        // ]
        // would render: <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    ],

    outDir: './build',

    srcDir: './src',

    themeConfig: {
        logo: '/logo.svg',
        nav: [
            { text: 'GitHub', link: '/guide' },
            { text: 'Flagfox', link: 'https://www.flagfox.dev' },
        ],
        editLink: {
            pattern: 'https://github.com/ylsideas/feature-flags-docs/edit/main/src/:path',
            text: 'Edit this page on GitHub'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ylsideas/feature-flags' }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present YLS Ideas'
        },

        sidebar: sidebarConfig()
    }
})

function sidebarConfig() {
    return [
        {
            text: 'Installation',
            items: [
                {text: 'Using Composer', link: '/installation/#using-composer'},
            ]
        },
        {
            text: 'Configuration',
            items: [
                {text: 'Gateways', link: '/configuration/#gateways'},
                {text: 'Caching With Gateways', link: '/configuration/#caching-with-gateways'},
                {text: 'Turning Off Functionality', link: '/configuration/#turning-off-functionality'},
                {text: 'Implementing Your Own Gateway', link: '/configuration/#implementing-your-own-gateway-drivers'},
            ]
        },
        {
            text: 'Usage',
            items: [
                {text: 'Checking Feature Accessibility', link: '/usage/#checking-feature-accessibility'},
                {text: 'Blade Views', link: '/usage/#blade-views'},
                {text: 'Routing Middleware', link: '/usage/#routing-middleware'},
                {text: 'Task Scheduling', link: '/usage/#task-scheduling'},
                {text: 'Query Builder', link: '/usage/#query-builder'},
                {text: 'Cleaning Up Features', link: '/usage/#cleaning-up-features'},
                {text: 'Artisan Commands', link: '/usage/#artisan-commands'},
                {text: 'Debugging Flag Access', link: '/usage/#debugging-flag-access'},
            ]
        },
        {
            text: 'Testing',
            items: [
                {text: 'Test Fake', link: '/testing/#test-fake'},
            ]
        }
    ]
}