import React, { useState } from "react";
import "./RightMain.css";
import MainCommentModal from "../Components/Main/MainCommentModal";
import MainBoard from "../Components/Main/MainBoard";
import MainPost from "../Components/Main/MainPost";

function RightMain() {
  //MainBoard,MainPost
  const [text, setText] = useState();
  const [img, setImg] = useState();
  const [post, setPost] = useState([]);
  const [commentIndex, setCommentIndex] = useState();

  //MainComment,MainCommentModal
  const [cmtModal, setCmtModal] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <>
      <MainBoard setPost={setPost} text={text} img={img} setText={setText} setImg={setImg} />
      <div className="main_post_out_wrap">
        {post.map((v, i) => (
          <MainPost
            like={like}
            setLike={setLike}
            setCommentIndex={setCommentIndex}
            imgs={v.img}
            v={v}
            i={i}
            setCmtModal={setCmtModal}
          />
        ))}
      </div>
      {cmtModal && (
        <MainCommentModal
          setPost={setPost}
          commentIndex={commentIndex}
          setComment={setComment}
          comment={comment}
          setCmtModal={setCmtModal}
          post={post}
        />
      )}
    </>
  );
}

export default RightMain;
