import { useEffect, useState } from "react";
import socket from "../Services/Socket.js";

const useSocket = (blockId, setCode, setRole) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initSocket = () => {
      try {
        socket.connect();
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }

      socket.on("connect_error", () => {
        setIsConnected(false);
      });

      socket.emit("join code block", blockId);

      socket.on("code update", (updatedCode) => {
        try {
          setCode((prevState) => ({ ...prevState, code: updatedCode.code }));
        } catch (error) {}
      });

      socket.on("set role", (role) => {
        try {
          setRole(role);
        } catch (error) {}
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });
    };

    initSocket();
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
    } catch (error) {}
  };

  return { sendCodeChange, isConnected };
};

export default useSocket;
