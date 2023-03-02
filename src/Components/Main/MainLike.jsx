import React from "react";
import "./MainLike.css";
import emptyHeart from "../../asset/emptyHeart.png";
import fullHeart from "../../asset/fullHeart.png";

function MainLike({ like, toggleLike }) {
  return (
    <div className="main_post_heart_check">
      <img
        src={like ? emptyHeart : fullHeart}
        onClick={toggleLike}
        alt="HeartIcon"
        style={{ width: "7%", cursor: "pointer" }}
      />
    </div>
  );
}

export default MainLike;
