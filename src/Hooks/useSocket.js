import { useEffect, useState } from "react";
import socket from "../Services/Socet.js";

const useSocket = (blockId, setCode, setRole) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    try {
      socket.connect();
      setIsConnected(true);
    } catch (error) {
      console.error("Socket connection failed:", error);
      setIsConnected(false);
    }

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
      setIsConnected(false);
    });

    socket.emit("join code block", blockId);

    socket.on("code update", (updatedCode) => {
      try {
        setCode((prevState) => ({ ...prevState, code: updatedCode.code }));
      } catch (error) {
        console.error("Error updating code:", error);
      }
    });

    socket.on("set role", (role) => {
      try {
        setRole(role);
      } catch (error) {
        console.error("Error setting role:", error);
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("code update");
      socket.off("set role");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [blockId, setCode, setRole]);

  const sendCodeChange = (code) => {
    try {
      socket.emit("code change", blockId, { code: code });
    } catch (error) {
      console.error("Error sending code change:", error);
    }
  };

  return { sendCodeChange, isConnected };
};

export default useSocket;
