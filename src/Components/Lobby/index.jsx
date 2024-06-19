import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
const items = [
  { title: "Loop Example", idItem: 1 },
  { title: "Function Example", idItem: 2 },
  { title: "Async Example", idItem: 3 },
  { title: "Array Example", idItem: 4 },
];
const Lobby = () => {
  const navigate = useNavigate();

  const onClickItem = (id) => {
    navigate(`/codeblock/${id}`);
  };

  return (
    <section className="lobby-section section">
      <h2 className="title">Choose code block</h2>
      <div className="options-list">
        {items.map((item) => (
          <p
            onClick={() => onClickItem(item.idItem)}
            key={item.idItem}
            className="list-item"
          >
            {item.title}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Lobby;
