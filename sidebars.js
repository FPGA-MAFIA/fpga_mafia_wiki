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
        'TFM/projectTool/Riscv',
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
        id: 'fabric/MAS/mas_intro',
      },
      items: [
        'fabric/MAS/mas_fabric',
        'fabric/MAS/mas_mini_core_tile',
        'fabric/MAS/mas_mini_core',
        'fabric/MAS/mas_router',
        'fabric/MAS/mas_fifo_arb',
        'fabric/MAS/mas_arbiter',
        'fabric/MAS/mas_fifo',
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
