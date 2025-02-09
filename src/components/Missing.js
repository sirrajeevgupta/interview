import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Missing = () => {
  const [data, setData] = useState('');
  return (
    <div>
      <textarea onChange={(e) => setData(e.target.value)}></textarea>
      <SyntaxHighlighter language='javascript' style={dark}>
        {data}
      </SyntaxHighlighter>
    </div>
  );
};

export default Missing;
