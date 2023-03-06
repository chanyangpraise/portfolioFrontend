import React, { useEffect, useState } from "react";
import "./MainLike.css";
import emptyHeart from "../../asset/emptyHeart.png";
import fullHeart from "../../asset/fullHeart.png";
import axios from "axios";
import { useSelector } from "react-redux";

function MainLike({ setLike, like, bid }) {
  const [count, setCount] = useState(0);
  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const uid = useSelector((store) => {
    console.log(store.loginState.userId);
    return store.loginState.userId;
  });
  //좋아요 카운트 받아오기
  useEffect(() => {
    axios
      .get(`http://13.125.96.165:3000/board/like/count?bid=${bid}`)
      .then((res) => {
        console.log(res);
        setCount(res.data.count);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  //좋아요 등록 및 취소
  const toggleLike = () => {
    //취소
    if (like) {
      setLike(false);
      axios
        .delete(`http://13.125.96.165:3000/board/like/${bid}/${uid}`)
        .then((res) => {
          // 좋아요 카운트 받아오기
          axios
            .get(`http://13.125.96.165:3000/board/like/count?bid=${bid}`)
            .then((res) => {
              console.log(res);
              setCount(res.data.count);
            })
            .catch((err) => {
              alert(err);
            });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //등록
      setLike(true);
      axios
        .post("http://13.125.96.165:3000/board/like", {
          uid: uid,
          bid: bid,
        })
        .then((res) => {
          axios
            .get(`http://13.125.96.165:3000/board/like/count?bid=${bid}`)
            .then((res) => {
              console.log(res);
              setCount(res.data.count);
            })
            .catch((err) => {
              alert(err);
            });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="main_post_heart_check">
      <img
        onClick={toggleLike}
        src={like ? fullHeart : emptyHeart}
        alt="HeartIcon"
        style={{ width: "7%", cursor: "pointer" }}
      />
      <span>{count}</span>
    </div>
  );
}

export default MainLike;
