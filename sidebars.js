module.exports = {
TFM: [
    {
      type: 'doc',
      id: 'TFM/welcome',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'IDE - Integrated Development Environment',
      link: {
        type: 'doc',
        id: 'TFM/projectTool/IDE',
      },
      items: [
        'TFM/projectTool/vs_code',
        'TFM/projectTool/GitBash',
        'TFM/projectTool/bashrc',
        'TFM/projectTool/extensions',
        'TFM/projectTool/python',
        'TFM/projectTool/markdown',
        'TFM/projectTool/docusaurus',
      ],
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
        'TFM/projectTool/basic_example',
        'TFM/projectTool/mod3_cnt',
        'TFM/projectTool/de10_lite',
        'TFM/projectTool/quartus_gui',
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
      id: 'build_script/getting_started',
      label: 'getting started',
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
      id: 'build_script/advanced_build_options',
      label: 'advanced build options',
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
    {
      type: 'doc',
      id: 'build_script/cmd_handbook',
      label: 'cmd_handbook',
    },
    {
      type: 'doc',
      id: 'build_script/mafia_scripts',
      label: 'mafia_scripts',
    },
  ],

  
  FPGA: [
    {
      type: 'doc',
      id: 'fpga/fpga_intro',
      label: 'intro',
    }, 
    {
      type: 'category',
      label: 'snake_game',
      link: {
        type: 'doc',
        id: 'fpga/snake_game/snake_game_intro',
      },
      items: [
        'fpga/snake_game/top_file',
        'fpga/snake_game/connect_uart',
        'fpga/snake_game/connect_joystick',
        'fpga/snake_game/compile',
        'fpga/snake_game/program_mem',
      ],
    },    
  ],

  IPs: [
    {
      type: 'doc',
      id: 'IPs/IPs_intro',
      label: 'IPs_intro',
    },
    {
      type: 'doc',
      id: 'IPs/vga',
      label: 'VGA',
    },
    {
      type: 'doc',
      id: 'IPs/uart',
      label: 'UART',
    },
    {
      type: 'doc',
      id: 'IPs/ps2_keyboard',
      label: 'PS2',
    },   
  ],

  Cache: [
    {
      type: 'doc',
      id: 'cache/cache_intro',
      label: 'Intro',
    },
    {
      type: 'category',
      label: 'HAS',
      link: {
        type: 'doc',
        id: 'cache/HAS/HAS_intro',
      },
      items: [
      ],
    },
    {
          type: 'category',
          label: 'MAS',
          link: {
            type: 'doc',
            id: 'cache/MAS/MAS_intro',
          },
          items: [
            'cache/MAS/d_cache',
            'cache/MAS/pipe',
            'cache/MAS/tag_data_arrays',
            'cache/MAS/tq_entry',
            'cache/MAS/tq',
          ],
        },
        {
          type: 'category',
          label: 'Verification',
          link: {
            type: 'doc',
            id: 'cache/Verif/verif_intro',
          },
          items: [
            'cache/Verif/refModel',
            'cache/Verif/trackers',
            'cache/Verif/post_proccess',
            'cache/Verif/Dedicated_test',
            'cache/Verif/Random_and_stress',
          ],
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
      label: 'Single cycle core',
      link: {
        type: 'doc',
        id: 'rvc/sc_core/intro',
      },
      items: [
        'rvc/sc_core/macros',
        'rvc/sc_core/sc_core_pkg',
        'rvc/sc_core/sc_core',
      ],
    },
    {
      type: 'category',
      label: 'Common Components',
      link: {
        type: 'doc',
        id: 'rvc/common/intro',
      },
      items: [
        'rvc/common/if',
        'rvc/common/decode',
        'rvc/common/rf',
        'rvc/common/exe',
        'rvc/common/mem_acs',
        'rvc/common/wb',
        'rvc/common/ctrl',
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
        'rvc/big_core/csr_registers',
        'rvc/big_core/cr_mem',
        'rvc/big_core/pmon',
        'rvc/big_core/exceptions',
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
        'rvc/core_verification/checker_tasks',
        'rvc/core_verification/verification_mini_core',

      ],
    },
    {
      type: 'doc',
      id: 'rvc/sw_libraries',
      label: 'SW libraries',
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
      label: 'Fabric HAS',
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
      label: 'Router HAS',
      link: {
        type: 'doc',
        id: 'fabric/MAS_router/mas_intro',
      },
      items: [
        'fabric/MAS_router/mas_router',
        'fabric/MAS_router/mas_next_tile_fifo_arb',
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
        'fabric/verification/verification_fifo_arb',
      ],
    },
  ],
};
