import React from "react";
import SideProfile from "../Side/SideProfile";
import "./MainComment.css";

function MainComment({ v, i }) {
  return (
    <div key={i} style={{ borderTop: "1px solid rgb(194, 194, 194)" }}>
      <SideProfile />
      <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line", marginBottom: "2rem" }}>{v}</pre>
    </div>
  );
}

export default MainComment;
