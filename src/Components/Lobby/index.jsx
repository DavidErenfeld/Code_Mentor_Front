import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Lobby = () => {
  const navigate = useNavigate();

  const onClickItem = (id) => {
    navigate(`/codeblock/${id}`);
  };

  return (
    <section className="lobby-section section">
      <h2 className="title">Choose code block</h2>
      <div className="options-list">
        <p onClick={() => onClickItem(1)} className="list-item">
          Loop Example
        </p>
        <p onClick={() => onClickItem(2)} className="list-item">
          Function Example
        </p>
        <p onClick={() => onClickItem(3)} className="list-item">
          Async Example
        </p>
        <p onClick={() => onClickItem(4)} className="list-item">
          Array Example
        </p>
      </div>
    </section>
  );
};

export default Lobby;
