import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/worker-javascript";
import "./style.css";

const CodeEditor = ({ code, onChange, role }) => {
  return (
    <AceEditor
      className="ace-editor-custom"
      mode="javascript"
      theme="dracula"
      value={code}
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        readOnly: role === "mentor",
        showLineNumbers: true,
        tabSize: 2,
        wrap: true,
        autoScrollEditorIntoView: true,
        cursorStyle: "ace",
        useWorker: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
      }}
    />
  );
};
export default CodeEditor;
