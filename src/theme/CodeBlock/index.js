import Prism from 'prism-react-renderer/prism';
import '../../prism-systemverilog'; // Import after the above line
import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';


export default function CodeBlockWrapper(props) {
  return (
    <>
      <CodeBlock {...props} />
    </>
  );
}
