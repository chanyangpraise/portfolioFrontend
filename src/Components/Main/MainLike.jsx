import React from "react";
import "./MainLike.css";
import emptyHeart from "../../asset/emptyHeart.png";
import fullHeart from "../../asset/fullHeart.png";

function MainLike() {
  return (
    <div className="main_post_heart_check">
      <img onClick={() => {}} src={HeartImg} alt="heart_check" className="main_post_heart_img" />
      <span>{}</span>
    </div>
  );
}

export default MainLike;
