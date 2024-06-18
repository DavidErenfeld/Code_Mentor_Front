import io from "socket.io-client";

const socket = io("https://boiling-springs-91338-006b899baec7.herokuapp.com", {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

export default socket;
