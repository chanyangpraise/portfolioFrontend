import React, { useEffect, useState } from "react";
import "./Main.css";
import MainCommentModal from "../Components/Main/MainCommentModal";
import MainBoard from "../Components/Main/MainBoard";
import axios from "axios";
import MainFeed from "../Components/Main/MainFeed";

function Main() {
  //MainBoard,MainPost
  const [text, setText] = useState();
  const [img, setImg] = useState();
  const [post, setPost] = useState([]);
  const [commentIndex, setCommentIndex] = useState();
  const [feed, setFeed] = useState([]);

  //MainComment,MainCommentModal
  const [cmtModal, setCmtModal] = useState(false);
  const [comment, setComment] = useState("");

  // 최근 게시물 6개 가져오기
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
  }, [post]);

  return (
    <>
      <MainBoard setFeed={setFeed} setPost={setPost} text={text} img={img} setText={setText} setImg={setImg} />
      <div className="main_post_out_wrap">
        <div>
          {cmtModal && (
            <MainCommentModal
              setComment={setComment}
              comment={comment}
              setCmtModal={setCmtModal}
              commentIndex={commentIndex}
              post={post}
              setPost={setPost}
            />
          )}
        </div>
        {feed.map((v, i) => (
          <MainFeed
            setFeed={setFeed}
            email={v.email}
            content={v.content}
            date={v.date}
            img={v.bimg}
            setCommentIndex={setCommentIndex}
            imgs={v.img}
            i={i}
            setCmtModal={setCmtModal}
            bid={v.bid}
            commentIndex={commentIndex}
          />
        ))}
      </div>
    </>
  );
}

export default Main;
