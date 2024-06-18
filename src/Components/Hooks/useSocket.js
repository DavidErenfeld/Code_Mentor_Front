import { useEffect } from "react";
import socket from "../Services/Socet.js";

const useSocket = (blockId, setCode, setRole) => {
  useEffect(() => {
    socket.connect();

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    socket.emit("join code block", blockId);

    socket.on("code update", (updatedCode) => {
      setCode((prevState) => ({ ...prevState, code: updatedCode.code }));
    });

    socket.on("set role", (role, mentorId) => {
      setRole(role);
    });

    return () => {
      socket.off("code update");
      socket.off("set role");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [blockId, setCode, setRole]);

  const sendCodeChange = (code) => {
    socket.emit("code change", blockId, { code: code });
  };

  return { sendCodeChange };
};

export default useSocket;
