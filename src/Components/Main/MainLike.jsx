import React, { useEffect, useRef, useState } from "react";
import "./MainLike.css";
import emptyHeart from "../../asset/emptyHeart.png";
import fullHeart from "../../asset/fullHeart.png";
import axios from "axios";
import { useSelector } from "react-redux";

function MainLike({ bid }) {
  const [count, setCount] = useState(0);
  const [like, setLike] = useState(false); // 좋아요 상태를 useState로 관리
  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const uid = useSelector((store) => {
    return store.loginState.userId;
  });

  useEffect(() => {
    //좋아요 카운트 받아오기
    axios
      .get(`http://13.125.96.165:3000/board/like/count?bid=${bid}`)
      .then((res) => {
        setCount(res.data.count);
      })
      .catch((err) => {
        alert(err);
      });
    // 좋아요 여부 받아오기
    axios
      .get(`http://13.125.96.165:3000/board/like/check?bid=${bid}&uid=${uid}`)
      .then((res) => {
        setLike(res.data.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //좋아요 등록 및 취소
  const toggleLike = () => {
    //취소
    if (like) {
      axios
        .delete(`http://13.125.96.165:3000/board/like/${bid}/${uid}`)
        .then((res) => {
          // 좋아요 여부 받아오기
          axios
            .get(`http://13.125.96.165:3000/board/like/check?bid=${bid}&uid=${uid}`)
            .then((res) => {
              setLike(res.data.isLiked);
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
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
      // setLike(true);
      axios
        .post("http://13.125.96.165:3000/board/like", {
          uid: uid,
          bid: bid,
        })
        .then((res) => {
          // 좋아요 여부 받아오기
          axios
            .get(`http://13.125.96.165:3000/board/like/check?bid=${bid}&uid=${uid}`)
            .then((res) => {
              setLike(res.data.isLiked);
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
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
        key={like}
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
