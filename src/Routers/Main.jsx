import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RightHome from "../Components/RightHome";
import SideBar from "../Components/SideBar";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SideBar />} />
        <Route path="/" element={<RightHome />} />
      </Routes>
    </Router>
  );
}

export default Main;
