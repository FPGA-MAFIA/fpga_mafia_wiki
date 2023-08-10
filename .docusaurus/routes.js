import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/fpga_mafia_wiki/blog',
    component: ComponentCreator('/fpga_mafia_wiki/blog', 'cf0'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/archive',
    component: ComponentCreator('/fpga_mafia_wiki/blog/archive', '73f'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/first-blog-post',
    component: ComponentCreator('/fpga_mafia_wiki/blog/first-blog-post', 'dff'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/long-blog-post',
    component: ComponentCreator('/fpga_mafia_wiki/blog/long-blog-post', '3b5'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/mdx-blog-post',
    component: ComponentCreator('/fpga_mafia_wiki/blog/mdx-blog-post', '982'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/tags',
    component: ComponentCreator('/fpga_mafia_wiki/blog/tags', '428'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/tags/docusaurus',
    component: ComponentCreator('/fpga_mafia_wiki/blog/tags/docusaurus', 'fa6'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/tags/facebook',
    component: ComponentCreator('/fpga_mafia_wiki/blog/tags/facebook', '629'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/tags/hello',
    component: ComponentCreator('/fpga_mafia_wiki/blog/tags/hello', '897'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/tags/hola',
    component: ComponentCreator('/fpga_mafia_wiki/blog/tags/hola', '576'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/blog/welcome',
    component: ComponentCreator('/fpga_mafia_wiki/blog/welcome', '96b'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/markdown-page',
    component: ComponentCreator('/fpga_mafia_wiki/markdown-page', 'fed'),
    exact: true
  },
  {
    path: '/fpga_mafia_wiki/docs',
    component: ComponentCreator('/fpga_mafia_wiki/docs', 'f09'),
    routes: [
      {
        path: '/fpga_mafia_wiki/docs/cache/ABD_notes',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/ABD_notes', '145'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/cache/Appendix',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/Appendix', '820'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/cache/Assumption_Assertions',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/Assumption_Assertions', 'd1b'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/cache/cache_intro',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/cache_intro', '20c'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/cache/cache_overview',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/cache_overview', '5e8'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/cache/High_level_block_description',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/High_level_block_description', '8a2'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/cache/High_level_Transaction_Flows',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/High_level_Transaction_Flows', '249'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/cache/Merge_Buffer_Behavior',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/Merge_Buffer_Behavior', '9de'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/cache/Verification',
        component: ComponentCreator('/fpga_mafia_wiki/docs/cache/Verification', '82d'),
        exact: true,
        sidebar: "Cache"
      },
      {
        path: '/fpga_mafia_wiki/docs/how_to/',
        component: ComponentCreator('/fpga_mafia_wiki/docs/how_to/', '6ae'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/how_to/github_action',
        component: ComponentCreator('/fpga_mafia_wiki/docs/how_to/github_action', '51f'),
        exact: true,
        sidebar: "HowTo"
      },
      {
        path: '/fpga_mafia_wiki/docs/how_to/HOW_TO_GIT',
        component: ComponentCreator('/fpga_mafia_wiki/docs/how_to/HOW_TO_GIT', '5f9'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/intro',
        component: ComponentCreator('/fpga_mafia_wiki/docs/intro', '6f6'),
        exact: true,
        sidebar: "Hello"
      },
      {
        path: '/fpga_mafia_wiki/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/fpga_mafia_wiki/docs/tutorial-basics/congratulations', '9aa'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/fpga_mafia_wiki/docs/tutorial-basics/create-a-blog-post', '8ba'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/fpga_mafia_wiki/docs/tutorial-basics/create-a-document', '666'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/fpga_mafia_wiki/docs/tutorial-basics/create-a-page', 'e8a'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/fpga_mafia_wiki/docs/tutorial-basics/deploy-your-site', 'e53'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/fpga_mafia_wiki/docs/tutorial-basics/markdown-features', '14b'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/fpga_mafia_wiki/docs/tutorial-extras/manage-docs-versions', '4fc'),
        exact: true
      },
      {
        path: '/fpga_mafia_wiki/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/fpga_mafia_wiki/docs/tutorial-extras/translate-your-site', 'b32'),
        exact: true
      }
    ]
  },
  {
    path: '/fpga_mafia_wiki/',
    component: ComponentCreator('/fpga_mafia_wiki/', 'c7b'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
