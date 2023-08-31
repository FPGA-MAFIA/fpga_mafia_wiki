module.exports = {
  TFM: [
    {
      type: 'doc',
      id: 'TFM/welcome',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: 'TFM/walkthrough_mafia',
      label: 'walkthrough_mafia',
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
      id: 'build_script/intro',
      label: 'Intro',
    },
    {
      type: 'doc',
      id: 'build_script/SW_compile',
      label: 'SW Compile',
    },
    {
      type: 'doc',
      id: 'build_script/HW_compile',
      label: 'HW Compile',
    },
    {
      type: 'doc',
      id: 'build_script/HW_elab_simulate',
      label: 'HW elaboration & simulation',
    },
    {
      type: 'doc',
      id: 'build_script/HW_gui_debug',
      label: 'HW GUI - debug',
    },
    {
      type: 'doc',
      id: 'build_script/PostProcess',
      label: 'PP - Simulation Post Process',
    },
    {
      type: 'doc',
      id: 'build_script/BuildOptions',
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
  RISCV_Cores:[
    {
      type: 'doc',
      id: 'rvc/intro',
      label: 'intro',
    },
    {
      type: 'category',
      label: 'Common Components',
      link: {
        type: 'doc',
        id: 'rvc/common/intro',
      },
      items: [
        'rvc/common/ctrl',
        'rvc/common/if',
        'rvc/common/decode',
        'rvc/common/rf',
        'rvc/common/exe',
        'rvc/common/mem_acs',
        'rvc/common/wb',
      ],
    },
    {
      type: 'category',
      label: 'Big Core',
      link: {
        type: 'doc',
        id: 'rvc/big_core/intro',
      },
      items: [
        'rvc/big_core/big_core_top',
        'rvc/big_core/big_core',
        'rvc/big_core/mem_wrap',
      ],
    },
    {
      type: 'category',
      label: 'Mini Core',
      link: {
        type: 'doc',
        id: 'rvc/mini_core/intro',
      },
      items: [
        'rvc/mini_core/mini_core_top',
        'rvc/mini_core/mini_core',
        'rvc/mini_core/mini_core_mem_wrap',
      ],
    },
    {
      type: 'category',
      label: 'Core Verification',
      link: {
        type: 'doc',
        id: 'rvc/core_verification/intro',
      },
      items: [
        'rvc/core_verification/elf_tests',
        'rvc/core_verification/regressions',
        'rvc/core_verification/rv32i_ref_model',
        'rvc/core_verification/print_sanity',

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
  MAS: [
    
  ]
};
