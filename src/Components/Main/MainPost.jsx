import React, { useRef } from "react";
import SideProfile from "../Side/SideProfile";
import "./MainPost.css";
import MainComment from "./MainComment";
import MainLike from "./MainLike";

function MainPost({ v, i, imgs, setCmtModal, setCommentIndex, setEditing }) {
  const Post = useRef();
  const Comment = useRef();
  const [like, setLike] = useState(null);

  function removeView() {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      console.log("삭제완료");
    }
  }

  return (
    <div ref={Post} className="main_post_in_wrap" key={i}>
      <div className="main_post_profile">
        <div>
          <SideProfile />
        </div>
        <div>
          <button className="main_follow_button">Follow</button>
        </div>
      </div>
      <div className="main_post_imgText">
        <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>{v.text}</pre>
        <img className="main_post_img" src={imgs} alt="#"></img>
      </div>
      <div className="main_post_bottom">
        <MainLike like={like} setLike={setLike} />
        <div className="main_post_bottom_menu">
          <span
            onClick={() => {
              setCmtModal(true);
              setCommentIndex(i);
            }}
          >
            댓글
          </span>
          <span onClick={() => setEditing(true)}>수정</span>
          <span onClick={() => removeView()}>삭제</span>
        </div>
      </div>
      {v.comment.map((v, i) => (
        <MainComment ref={Comment} v={v} id={i} />
      ))}
    </div>
  );
}

export default MainPost;
