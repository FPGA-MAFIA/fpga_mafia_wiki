// src/prism-systemverilog.js

import Prism from 'prismjs';

(function (Prism) {
    Prism.languages.systemverilog = {
        'comment': {
            pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
            greedy: true
        },
        'string': {
            pattern: /"[^"\n]*"/,
            greedy: true
        },
        'keyword': /\b(?:module|endmodule|input|output|logic|wire|reg)\b/,
        'number': /\b\d+\b/,
        'operator': /=|<|>|!/,
        'punctuation': /[{}();,]/
    };
  })(Prism);
  