import React, { useEffect, useState } from "react";
import "./RightMain.css";
import MainCommentModal from "../Components/Main/MainCommentModal";
import MainBoard from "../Components/Main/MainBoard";
import MainPost from "../Components/Main/MainPost";
import axios from "axios";
import MainFeed from "../Components/Main/MainFeed";

function RightMain() {
  //MainBoard,MainPost
  const [text, setText] = useState();
  const [img, setImg] = useState();
  const [post, setPost] = useState([]);
  const [commentIndex, setCommentIndex] = useState();
  const [feed, setFeed] = useState([]);

  //MainComment,MainCommentModal
  const [cmtModal, setCmtModal] = useState(false);
  const [comment, setComment] = useState("");
  useEffect(() => {
    axios
      .get("http://13.125.96.165:3000/board/get/main")
      .then((res) => {
        console.log(res);
        setFeed(res.data.content);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <>
      <MainBoard setPost={setPost} text={text} img={img} setText={setText} setImg={setImg} />
      <div className="main_post_out_wrap">
        {post.map((v, i) => (
          <MainPost
            comment={comment}
            setPost={setPost}
            cmtModal={cmtModal}
            setCommentIndex={setCommentIndex}
            key={i}
            imgs={v.img}
            v={v}
            bid={v.bid}
            setCmtModal={setCmtModal}
            commentIndex={commentIndex}
            post={post}
            setComment={setComment}
          />
        ))}
        {feed.map((v, i) => (
          <MainFeed
            uid={v.uid}
            content={v.content}
            date={v.date}
            img={v.bimg}
            setCommentIndex={setCommentIndex}
            imgs={v.img}
            i={i}
            setCmtModal={setCmtModal}
            bid={v.bid}
          />
        ))}
      </div>
    </>
  );
}

export default RightMain;
