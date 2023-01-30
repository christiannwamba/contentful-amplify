import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function renderCode({ node, inline, className, children, ...props }) {
  const match = className && className.startsWith('language-');
  return !inline && match ? (
    <SyntaxHighlighter
      style={atomOneDark}
      customStyle={{
        backgroundColor: 'transparent',
      }}
      language={className.split('-')[1]}
      PreTag="div"
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <Code>{children}</Code>
  );
}

export function Code({children}) {
  return (
    <code
      {...props}
      className="before:content-[''] after:content-[''] bg-indigo-50 py-0.5 px-2 rounded"
    >
      {children}
    </code>
  )
}