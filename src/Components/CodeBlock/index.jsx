import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../Hooks/useSocket.js";
import { getCodeBlockData } from "../Services/codeBlocksService.js";
import "./style.css";
import CodeEditor from "../CodeEditor/index.jsx";
import SuccessMessage from "../SuccessMessage/index.jsx";

const CodeBlockPage = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const [code, setCode] = useState({ title: "", code: "", solution: "" });
  const [role, setRole] = useState("");
  const [isSolved, setIsSolved] = useState(false);

  const { sendCodeChange } = useSocket(numericId, setCode, setRole);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCodeBlockData(numericId);
      setCode(data);
    };
    fetchData();
  }, [numericId]);

  const handleCodeChange = (newCode) => {
    if (role !== "mentor") {
      setCode((prev) => ({ ...prev, code: newCode }));
      sendCodeChange(newCode);
      if (
        newCode.trim().replace(/\s+$/gm, "") ===
        code.solution.trim().replace(/\s+$/gm, "")
      ) {
        setIsSolved(true);
        setTimeout(() => setIsSolved(false), 4000);
      }
    }
  };

  return (
    <div className="section">
      <h2 className="title">{code.title}</h2>
      <div className="code-editor-section">
        <p className="user-mode">{`${role} mode`}</p>
        <CodeEditor code={code.code} onChange={handleCodeChange} role={role} />
        {isSolved && <SuccessMessage />}
      </div>
    </div>
  );
};

export default CodeBlockPage;
