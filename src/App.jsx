import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./Components/Lobby";
import CodeBlockPage from "./Components/CodeBlock";
import "./App.css";
import ace from "ace-builds/src-noconflict/ace";
ace.config.set("basePath", "/node_modules/ace-builds/src-noconflict");

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/codeblock/:id" element={<CodeBlockPage />} />
      </Routes>
    </Router>
  );
};

export default App;
