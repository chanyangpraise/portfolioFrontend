import React, { useEffect, useRef, useState } from "react";
import "./MainFeed.css";
import MainComment from "./MainComment";
import MainLike from "./MainLike";
import axios from "axios";
import { useSelector } from "react-redux";
import BoardProfile from "../Side/BoardProfile";

function MainFeed({ uuid, email, setFeed, commentIndex, setCmtModal, setCommentIndex, content, date, img, bid }) {
  const Post = useRef();
  const Comment = useRef();
  const [like, setLike] = useState(false);
  const [cmt, setCmt] = useState([]);
  const [post, setPost] = useState([]);
  const [following, setFollowing] = useState(false);

  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const uid = useSelector((store) => {
    console.log(store.loginState.userId);
    return store.loginState.userId;
  });

  // 댓글 목록 조회
  useEffect(() => {
    axios
      .get(`http://13.125.96.165:3000/comment/get/${bid}`)
      .then((res) => {
        console.log(res);
        setCmt(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //게시물 삭제요청
  function removeView() {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      removePost(bid);
      axios
        .delete(`http://13.125.96.165:3000/board/delete/${bid}?uid=${uid}`)
        .then((res) => {
          console.log(res);
          alert("삭제완료");
          axios
            .get("http://13.125.96.165:3000/board/get/main")
            .then((res) => {
              console.log(res);
              setFeed(res.data.content);
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => console.log(err));
    }
  }

  //좋아요 등록 및 취소
  const toggleLike = () => {
    //취소
    if (!like) {
      setLike(false);
      axios
        .delete(`http://13.125.96.165:3000/board/like/${bid}/${uid}`)
        .then((res) => {
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
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const userId = useSelector((store) => {
    return store.loginState.userId;
  });

  function removePost(bid) {
    const newPost = post.filter((v) => {
      return v.bid !== bid;
    });
    setPost(newPost);
  }

  //팔로우 하기 , 팔로우 취소
  const followClick = () => {
    if (following) {
      setFollowing(!following);
      axios
        .delete(`http://13.125.96.165:3000/profile/unfollow?follower=${uuid}&following=${userId}`)
        .then((res) => {
          if (res.data.message === "성공되었습니다.") {
            alert("팔로우 취소");
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      setFollowing(!following);
      axios
        .post("http://13.125.96.165:3000/profile/follow", {
          following: userId,
          follower: uuid,
        })
        .then((res) => {
          if (res.data.message === "성공되었습니다.") {
            alert("팔로우 성공");
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div ref={Post} className="main_post_in_wrap" key={bid}>
        <div className="main_post_profile">
          <div>
            <BoardProfile email={email} />
          </div>
          <div>
            <button onClick={followClick} className="main_follow_button">
              {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>
        <div className="main_post_imgText">
          <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>{content}</pre>

          <img className="main_post_img" src={img} alt="#"></img>
        </div>
        <div className="main_post_bottom">
          <div>
            <MainLike bid={bid} like={like} toggleLike={toggleLike} />
          </div>
          <div className="main_post_bottom_menu">
            <span
              onClick={() => {
                setCmtModal(true);
                setCommentIndex(bid);
              }}
            >
              댓글
            </span>
            <span onClick={() => removeView()}>삭제</span>
          </div>
        </div>
        <span className="main_post_date">게시물 작성일 : {date}</span>
        {cmt.map((v) => (
          <MainComment
            bid={bid}
            setCmt={setCmt}
            cid={v.cid}
            email={v.email}
            commentIndex={commentIndex}
            date={v.date}
            ref={Comment}
            content={v.content}
          />
        ))}
      </div>
    </>
  );
}

export default MainFeed;
