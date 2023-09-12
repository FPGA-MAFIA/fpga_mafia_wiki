module.exports = {
TFM: [
    {
      type: 'doc',
      id: 'TFM/welcome',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: 'TFM/projectTool/Walkthrough',
      label: 'GettingStarted(draft)',
    },
    {
      type: 'category',
      label: 'GettingStarted',
      link: {
        type: 'doc',
        id: 'TFM/projectTool/start',
      },
      items: [
        'TFM/projectTool/GitBash',
        'TFM/projectTool/bashrc',
        'TFM/projectTool/python',
      ],
    },
    {
      type: 'category',
      label: 'vscode environment',
      link: {
        type: 'doc',
        id: 'TFM/projectTool/VsCode',
      },
      items: [
        'TFM/projectTool/vs_code',
        'TFM/projectTool/extensions',
        'TFM/projectTool/markdown',
      ],
    },
    {
      type: 'doc',
      id: 'TFM/projectTool/hardware_tools',
      label: 'hw simulator & tools',
    },
    {
      type: 'category',
      label: 'modelsim',
      link: {
        type: 'doc',
        id: 'TFM/projectTool/modelsim_intro',
      },
      items: [
        'TFM/projectTool/hw_compile',
        'TFM/projectTool/hw_elab',
        'TFM/projectTool/hw_sim',
        'TFM/projectTool/hw_gui_debug',
        'TFM/projectTool/modelsim_examples',
      ],
    },
    {
      type: 'category',
      label: 'Quartus & FPGA',
      link: {
        type: 'doc',
        id: 'TFM/projectTool/quartus_intro',
      },
      items: [
        'TFM/projectTool/quartus',
        'TFM/projectTool/quartus_gui',
        'TFM/projectTool/fpga_and_de10lite',
      ],
    },
    {
      type: 'category',
      label: 'GCC - RISCV',
      link: {
        type: 'doc',
        id: 'TFM/projectTool/gcc_intro',
      },
      items: [
        'TFM/projectTool/GccRiscV',
        'TFM/projectTool/linker',
        'TFM/projectTool/crt0',
      ],
    },
    {
      type: 'category',
      label: 'git & github',
      link: {
        type: 'doc',
        id: 'TFM/projectTool/intro',
      },
      items: [
        'TFM/projectTool/version_control',
        'TFM/projectTool/git_and_github',
        'TFM/projectTool/git_cheat_sheet',
        'TFM/projectTool/GitHubActions',
        `TFM/projectTool/git_hub_projects`,
        `TFM/projectTool/git_hub_tfm`,
      ],
    },
    {
      type: 'category',
      label: 'System Verilog',
      link: {
        type: 'doc',
        id: 'TFM/verilog/intro',
      },
      items: [
        'TFM/verilog/examples',
        'TFM/verilog/basic_concepts',
        'TFM/verilog/sv_types',
        'TFM/verilog/multi_dim_array',
        'TFM/verilog/coding_style',
        'TFM/verilog/pre_compile',
      ],
    },
    {
      type: 'doc',
      id: 'TFM/projectTool/TFM_Sanity',
      label: 'TFM_Sanity',
    },
  ],

MAFIA_Build: [
    {
      type: 'doc',
      id: 'build_script/intro',
      label: 'Intro',
    },
    {
      type: 'doc',
      id: 'TFM/walkthrough_mafia',
      label: 'walkthrough_mafia',
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
      id: 'build_script/BuildOptions',
      label: 'Build Options & Examples',
    },
    {
      type: 'doc',
      id: 'build_script/build_gui',
      label: 'Build GUI - command generator',
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
