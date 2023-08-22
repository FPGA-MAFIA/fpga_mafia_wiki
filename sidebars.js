module.exports = {
  TFM: [
    {
      type: 'doc',
      id: 'TFM/welcome',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Project-Tools',
      link: {
        type: 'doc',
        id: 'TFM/projectTool/intro',
      },
      items: [
        'TFM/projectTool/VsCode',
        'TFM/projectTool/git_and_github',
        'TFM/projectTool/GitBash',
        'TFM/projectTool/GitHubActions',
        'TFM/projectTool/GccRiscV',
        'TFM/projectTool/ModelSim',
        'TFM/projectTool/Walkthrough',
      ],
    },
    {
      type: 'category',
      label: 'System Verilog',
      link: {
        type: 'doc',
        id: 'TFM/verilog/vlg_intro',
      },
      items: [
        'TFM/verilog/vlg0',
        'TFM/verilog/vlg1',
        'TFM/verilog/vlg2',
        'TFM/verilog/vlg3',
        'TFM/verilog/vlg4',
        'TFM/verilog/vlg5',
        'TFM/verilog/vlg6',
      ],
    },
  ],
  Build: [
    {
      type: 'doc',
      id: 'build/intro',
      label: 'Intro',
    },
    {
      type: 'doc',
      id: 'build/SW_compile',
      label: 'SW Compile',
    },
    {
      type: 'doc',
      id: 'build/HW_compile',
      label: 'HW Compile',
    },
    {
      type: 'doc',
      id: 'build/HW_elab_simulate',
      label: 'HW elaboration & simulation',
    },
    {
      type: 'doc',
      id: 'build/HW_gui_debug',
      label: 'HW GUI - debug',
    },
    {
      type: 'doc',
      id: 'build/PostProcess',
      label: 'PP - Simulation Post Process',
    },
    {
      type: 'doc',
      id: 'build/BuildOptions',
      label: 'Build Options & Examples',
    },
  ],
  Cache: [
    {
      type: 'doc',
      id: 'cache/cache_intro',
      label: 'Intro',
    },
    {
      type: 'doc',
      id: 'cache/cache_overview',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'cache/High_level_block_description',
      label: 'High level block description',
    },
    {
      type: 'doc',
      id: 'cache/High_level_Transaction_Flows',
      label: 'High level Transaction Flows',
    },
    {
      type: 'doc',
      id: 'cache/Merge_Buffer_Behavior',
      label: 'Merge Buffer Behavior',
    },
    {
      type: 'doc',
      id: 'cache/Verification',
      label: 'Verification',
    },
    {
      type: 'doc',
      id: 'cache/Assumption_Assertions',
      label: 'Assumption & Assertions',
    },
    {
      type: 'doc',
      id: 'cache/Appendix',
      label: 'Appendix',
    },
    {
      type: 'doc',
      id: 'cache/ABD_notes',
      label: 'ABD Notes',
    },
  ],
  Big_core:[
    {
      type: 'doc',
      id: 'big_core/intro',
      label: 'intro',
    },
    {
      type: 'category',
      label: 'Big-Core MAS',
      link: {
        type: 'doc',
        id: 'big_core/MAS/intro',
      },
      items: [
        'big_core/MAS/mem_wrap',
        'big_core/MAS/big_core_top',
      ],
    },
  ],
  Fabric:[
    {
      type: 'doc',
      id: 'fabric/intro',
      label: 'intro',
    },
    {
      type: 'category',
      label: 'Fabric MAS',
      link: {
        type: 'doc',
        id: 'fabric/MAS_fabric/mas_intro',
      },
      items: [
        'fabric/MAS_fabric/mas_fabric',
        'fabric/MAS_fabric/mas_mini_core_tile',
      ],
    },
    {
      type: 'category',
      label: 'mini_core MAS',
      link: {
        type: 'doc',
        id: 'fabric/MAS_mini_core/mas_intro',
      },
      items: [
        'fabric/MAS_mini_core/mas_mini_core',
      ],
    },
    {
      type: 'category',
      label: 'Router MAS',
      link: {
        type: 'doc',
        id: 'fabric/MAS_router/mas_intro',
      },
      items: [
        'fabric/MAS_router/mas_router',
        'fabric/MAS_router/mas_fifo_arb',
        'fabric/MAS_router/mas_arbiter',
        'fabric/MAS_router/mas_fifo',
      ],
    },
    {
      type: 'category',
      label: 'Fabric Verification',
      link: {
        type: 'doc',
        id: 'fabric/verification/verification_intro',
      },
      items: [
        'fabric/verification/verification_fabric',
        'fabric/verification/verification_mini_core_tile',
        'fabric/verification/verification_mini_core',
        'fabric/verification/verification_router',
        'fabric/verification/verification_fifo_arb',
        'fabric/verification/verification_arbiter',
        'fabric/verification/verification_fifo',
      ],
    },
  ],
};
