import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../../Hooks/useSocket.js";
import { getCodeBlockData } from "../../Services/codeBlocksService.js";
import "./style.css";
import CodeEditor from "../CodeEditor/index.jsx";
import SuccessMessage from "../SuccessMessage/index.jsx";
import Loader from "../Loader/index.jsx";

const CodeBlockPage = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const [code, setCode] = useState({ title: "", code: "", solution: "" });
  const [role, setRole] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { sendCodeChange, isConnected } = useSocket(
    numericId,
    setCode,
    setRole
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCodeBlockData(numericId);
        setCode(data);
        setFetchError(false);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch code block data:", error);
        setFetchError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCodeChange = (newCode) => {
    if (role !== "mentor" && isConnected) {
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
    <>
      {loading ? (
        <div className="loater-section">
          <Loader />
        </div>
      ) : (
        <section className="section">
          <h2 className="title">{code.title}</h2>
          {fetchError ? (
            <p className="text-danger">
              Failed to fetch code block data. Please try again later.
            </p>
          ) : (
            <div className="code-editor-section">
              <p className="user-mode">{`${role} mode`}</p>

              <CodeEditor
                code={code.code}
                onChange={handleCodeChange}
                role={role}
              />
              {isSolved && <SuccessMessage />}
              {!isConnected && (
                <p className="text-danger">
                  Network error, please try again later
                </p>
              )}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default CodeBlockPage;
