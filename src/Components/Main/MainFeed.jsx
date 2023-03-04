import React, { useEffect, useRef, useState } from "react";
import SideProfile from "../Side/SideProfile";
import "./MainFeed.css";
import MainComment from "./MainComment";
import MainLike from "./MainLike";
import MainCommentModal from "./MainCommentModal";
import axios from "axios";

function MainFeed({ commentIndex, setCmtModal, setCommentIndex, setEditing, content, date, img, bid }) {
  const Post = useRef();
  const Comment = useRef();
  const [like, setLike] = useState(true);
  const [cmt, setCmt] = useState([]);

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
  }, [cmt]);

  function removeView() {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      console.log("삭제완료");
    }
  }

  const toggleLike = () => {
    setLike(!like);
  };

  return (
    <>
      <div ref={Post} className="main_post_in_wrap" key={bid}>
        <div className="main_post_profile">
          <div>
            <SideProfile />
          </div>
          <div>
            <button className="main_follow_button">Follow</button>
          </div>
        </div>
        <div className="main_post_imgText">
          <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>{content}</pre>

          <img className="main_post_img" src={img} alt="#"></img>
        </div>
        <div className="main_post_bottom">
          <div>
            <MainLike like={like} toggleLike={toggleLike} />
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
            <span onClick={() => setEditing(true)}>수정</span>
            <span onClick={() => removeView()}>삭제</span>
          </div>
        </div>
        <span className="main_post_date">게시물 작성일 : {date}</span>
        {cmt.map((v) => (
          <MainComment commentIndex={commentIndex} date={v.date} ref={Comment} content={v.content} />
        ))}
      </div>
    </>
  );
}

export default MainFeed;
