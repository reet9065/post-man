import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

function JsonEditor({
  value = '',
  onChange = () => {},
  onFocus = () => {},
  readOnly = false,
  height = '200px',
}) {
  return (
    <CodeMirror
      value={value}
      height={height}
      extensions={[json()]}
      readOnly={readOnly}
      theme="light"
      onChange={(val, viewUpdate) => {
        if (onChange) onChange(val);
      }}
      onFocus={(editorView) => {
        if (onFocus) onFocus(editorView);
      }}
    />
  );
}

export default JsonEditor;
