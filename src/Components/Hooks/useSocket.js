import { useEffect } from "react";
import socket from "../../Socet.js";

const useSocket = (blockId, setCode, setRole, setMentorId) => {
  useEffect(() => {
    socket.connect();
    socket.emit("join code block", blockId);

    socket.on("code update", (updatedCode) => {
      setCode((prevState) => ({ ...prevState, code: updatedCode.code }));
    });

    socket.on("set role", (role, mentorId) => {
      setRole(role);
      if (role === "mentor") setMentorId(mentorId);
    });

    return () => {
      socket.off("code update");
      socket.off("set role");
      socket.disconnect();
    };
  }, [blockId, setCode, setRole, setMentorId]);

  const sendCodeChange = (code) => {
    socket.emit("code change", blockId, { code: code });
  };

  return { sendCodeChange };
};

export default useSocket;
