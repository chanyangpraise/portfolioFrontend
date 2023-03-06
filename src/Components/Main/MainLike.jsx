import React, { useEffect, useState } from "react";
import "./MainLike.css";
import emptyHeart from "../../asset/emptyHeart.png";
import fullHeart from "../../asset/fullHeart.png";
import axios from "axios";

function MainLike({ like, toggleLike, bid }) {
  const [count, setCount] = useState(0);
  //좋아요 카운트 받아오기
  const handleToggleLike = () => {
    toggleLike();
    axios
      .get(`http://13.125.96.165:3000/board/like/count?bid=${bid}`)
      .then((res) => {
        console.log(res);
        setCount(res.data.count);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="main_post_heart_check">
      <img
        src={like ? fullHeart : emptyHeart}
        onClick={handleToggleLike}
        alt="HeartIcon"
        style={{ width: "7%", cursor: "pointer" }}
      />
      <span>{count}</span>
    </div>
  );
}

export default MainLike;
