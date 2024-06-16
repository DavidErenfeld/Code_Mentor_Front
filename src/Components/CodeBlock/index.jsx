import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import codeBlocks from "../../Code.js";
import "./style.css";

// Import a mode (language) and a theme for Ace Editor
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const CodeBlockPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");

  useEffect(() => {
    // Load the code block based on the ID
    const codeBlock = codeBlocks.find((block) => block.id === parseInt(id));
    if (codeBlock) {
      setCode(codeBlock);
    } else {
      setCode("// Code block not found");
    }
  }, [id]);

  return (
    <div className="section">
      <h2 className="title">{code.title}</h2>
      <AceEditor
        className="ace-editor-custom"
        mode="javascript"
        theme="monokai"
        value={code.code}
        onChange={setCode}
        name="UNIQUE_ID_OF_DIV"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        editorProps={{
          $blockScrolling: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
          wrap: true,
          cursorStyle: "ace",
          useWorker: false,
          scrollPastEnd: 1,
        }}
      />
    </div>
  );
};

export default CodeBlockPage;
