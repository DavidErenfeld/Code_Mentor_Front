import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import socket from "../../Socet.js";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "./style.css";

const CodeBlockPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState({ title: "", code: "" });
  const [role, setRole] = useState("");
  const numericId = parseInt(id, 10);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/codeBlocks`);
      if (!response.ok) {
        throw new Error("Failed to fetch: " + response.statusText);
      }
      const data = await response.json();
      const codeBlock = data.find((block) => block.id === numericId);
      if (codeBlock) {
        setCode(codeBlock);
      } else {
        throw new Error("Code block not found");
      }
    } catch (error) {
      console.error("Error fetching code blocks:", error.message);
      setCode({ title: "Error", code: "// Error fetching code block" });
    }
  };

  useEffect(() => {
    socket.connect();
    socket.on("code update", (updatedCode) => {
      console.log(
        "Current block ID:",
        numericId,
        "Updated code ID:",
        updatedCode.id
      );
      if (parseInt(updatedCode.id, 10) === numericId) {
        setCode((prevState) => ({ ...prevState, code: updatedCode.code }));
        console.log("Updated code in state:", updatedCode);
      }
    });

    socket.on("set role", (role) => {
      console.log("User role:", role);
      setRole(role);
    });

    getData();

    return () => {
      socket.off("code update");
      socket.off("set role");
      socket.disconnect();
    };
  }, [id]);

  const handleCodeChange = (newCode) => {
    if (role === "student") {
      console.log("Sending code change to server:", { id, code: newCode });
      setCode((prev) => ({ ...prev, code: newCode }));
      socket.emit("code change", { id, code: newCode });
    }
  };

  return (
    <div className="section">
      <h2 className="title">{code.title}</h2>
      <div className="role-indicator">
        {role === "mentor" && <p>You are in Mentor mode.</p>}
        {role === "student" && <p>You are in Student mode.</p>}
        {role === "readonly" && <p>Read-only mode. No mentor connected.</p>}
      </div>
      <AceEditor
        className="ace-editor-custom"
        mode="javascript"
        theme="monokai"
        value={code.code}
        onChange={handleCodeChange}
        name="UNIQUE_ID_OF_DIV"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          readOnly: role === "mentor" || role === "readonly",
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
