import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import { debounce } from "lodash";
import useSocket from "../Hooks/useSocket.js";
import { getCodeBlockData } from "../Services/codeBlocksService.js";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "./style.css";

const CodeBlockPage = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const [code, setCode] = useState({ title: "", code: "", solution: "" });
  const [role, setRole] = useState("");
  const [mentorId, setMentorId] = useState(null);
  const [isSolved, setIsSolved] = useState(false);

  const { sendCodeChange } = useSocket(
    numericId,
    setCode,
    setRole,
    setMentorId
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCodeBlockData(numericId);
      setCode(data);
    };
    fetchData();
  }, [numericId]);

  const handleCodeChange = debounce((newCode) => {
    if (role !== "mentor") {
      setCode((prev) => ({ ...prev, code: newCode }));
      sendCodeChange(newCode);
      if (
        newCode.trim().replace(/\s+$/gm, "") ===
        code.solution.trim().replace(/\s+$/gm, "")
      ) {
        setIsSolved(true);
        setTimeout(() => setIsSolved(false), 2000);
      }
    }
  }, 300);

  return (
    <div className="section">
      <h2 className="title">{code.title}</h2>
      <div className="code-editor-section">
        <div className="user-mode">
          {role === "mentor" ? (
            <p>You are the mentor for this block, in read-only mode.</p>
          ) : (
            <p>You are a student.</p>
          )}
        </div>
        <AceEditor
          className="ace-editor-custom"
          mode="javascript"
          theme="dracula"
          value={code.code}
          onChange={handleCodeChange}
          name="UNIQUE_ID_OF_DIV"
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            readOnly: role === "mentor", // Only mentors in read-only mode
            showLineNumbers: true,
            tabSize: 2,
            wrap: true,
            autoScrollEditorIntoView: true,
            cursorStyle: "ace",
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
      </div>
      {isSolved && <div className="success-animation">😊</div>}
    </div>
  );
};

export default CodeBlockPage;
