import React, { useRef, useState } from "react";
import "./RightMain.css";
import MainCommentModal from "../Components/Main/MainCommentModal";
import MainHeader from "../Components/Main/MainHeader";
import MainBoard from "../Components/Main/MainBoard";
import MainPost from "../Components/Main/MainPost";
import MainPostEdit from "../Components/Main/MainPostEdit";
// import SideProfile from "../Components/Side/SideProfile";

function RightMain() {
  //MainBoard,MainPost
  const [text, setText] = useState();
  const [img, setImg] = useState();
  const [post, setPost] = useState([]);
  const [commentIndex, setCommentIndex] = useState();

  //MainComment,MainCommentModal
  const [cmtModal, setCmtModal] = useState(false);
  const [comment, setComment] = useState("");

  //EditPost
  const [editing, setEditing] = useState(false);

  return (
    <>
      <MainHeader />
      <MainBoard setPost={setPost} text={text} img={img} setText={setText} setImg={setImg} />
      <div className="main_post_out_wrap">
        {post.map((v, i) => (
          <MainPost
            setCommentIndex={setCommentIndex}
            imgs={v.img}
            v={v}
            i={i}
            setCmtModal={setCmtModal}
            setEditing={setEditing}
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
      {editing && <MainPostEdit setCmtModal={setCmtModal} />}
    </>
  );
}

export default RightMain;
