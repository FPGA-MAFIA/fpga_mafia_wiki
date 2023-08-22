//const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion

/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'FPGA Multi-Agent FabrIc Architecture ',
  tagline: '',
  url: 'https://amichai-bd.github.io ',
  baseUrl: '/fpga_mafia_wiki/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'amichai-bd', // Usually your GitHub org/user name.
  projectName: 'fpga_mafia_wiki', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/amichai-bd/fpga_mafia_wiki/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'FPGA MAFIA',
        logo: {
          alt: 'BIU logo',
          src: 'img/BIU.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'fabric/intro',
            position: 'left',
            label: 'Fabric', 
          },  
          {
            type: 'doc',
            docId: 'cache/cache_intro',
            position: 'left',
            label: 'Cache', 
          },  
          {
            type: 'doc',
            docId: 'big_core/intro',
            position: 'left',
            label: 'Big Core', 
          },  
          {
            type: 'doc',
            docId: 'build_script/intro',
            position: 'left',
            label: 'Build', 
          },  
          {
            type: 'doc',
            docId: 'TFM/welcome',
            position: 'right',
            label: 'TFM',
          },
          {
            href: 'https://github.com/amichai-bd/fpga_mafia',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
			  // Down left
            title: 'Contributors',
            items: [
              {
                label: 'Amichai Ben-David',
                to: 'https://www.linkedin.com/in/amichai-ben-david',
              },
              {
                label: 'Noam Sabban',
                to: 'https://www.linkedin.com/in/noam-sabban',
              },
              {
                label: 'Shmuel Sfez',
                to: 'https://github.com/ShmuelSfez',
              },
              { 
                label: 'Yeonatan Perelman',
                to: 'https://github.com/yeonatanPerelman',
              },
              {
                label: 'Daniel Kaufman',
                to: 'https://github.com/danielk532',
              },
            ],
          },
          {
			  // Down left
            title: 'RTL Units',
            items: [
              {
                label: 'Fabric',
                to: '/docs/fabric/intro',
              },
              {
                label: '- Router',
                to: '/docs/fabric/intro',
              },
              {
                label: '- Mini Core',
                to: '/docs/fabric/intro',
              },
              {
                label: 'Big Core',
                to: '/docs/big_core/intro',
              },
              {
                label: 'Memory Subsystem',
                to: '/docs/cache/cache_intro',//FIXME
              },
              {
                label: '- Instruction Cache',
                to: '/docs/cache/cache_intro',//FIXME
              },
              {
                label: '- Data Cache',
                to: '/docs/cache/cache_intro',
              },
              {
                label: '- Memory Controller',
                to: '/docs/cache/cache_intro',//FIXME
              },
            ],
          },
          {
			  // Down left
            title: 'TFM',
            items: [
              {
                label: 'Project Tool',
                to: '/docs/TFM/projectTool/intro',
              },
              {
                label: '- Git & GitHub',
                to: '/docs/TFM/projectTool/git_and_github',
              },
              {
                label: '- RISCV GCC',
                to: '/docs/TFM/projectTool/GccRiscV',
              },
              {
                label: '- Modelsim',
                to: '/docs/TFM/projectTool/ModelSim',
              },
              {
                label: '- Quartus',
                to: '/docs/TFM/projectTool/ModelSim',//FIXME
              },
              {
                label: 'System-Verilog',
                to: '/docs/TFM/verilog/vlg_intro',
              },
            ],
          },
          {
            title: 'GitHub - links',
            items: [
              {
                label: 'GitHub - FPGA MAFIA',
                href: 'https://github.com/amichai-bd/fpga_mafia',
              },
              {
                label: 'GitHub - FPGA MAFIA WIKI',
                href: 'https://github.com/amichai-bd/fpga_mafia_wiki',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MAFIA Project`,
      },
      prism: {
        darkTheme: darkCodeTheme,
        //additionalLanguages: ['systemverilog'],
      },
    }),
});
