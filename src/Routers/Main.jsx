import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Main.css";
import MainCommentModal from "../Components/Main/MainCommentModal";
import MainBoard from "../Components/Main/MainBoard";
import axios from "axios";
import MainFeed from "../Components/Main/MainFeed";

function Main() {
  const [text, setText] = useState();
  const [img, setImg] = useState();
  const [post, setPost] = useState([]);
  const [commentIndex, setCommentIndex] = useState();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  //MainComment,MainCommentModal
  const [cmtModal, setCmtModal] = useState(false);
  const [comment, setComment] = useState("");
  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  //게시물 목록 불러오기
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://13.125.96.165:3000/board/get/main?page=${page}&count=6`)
      .then((res) => {
        console.log(res);
        if (res.data.content.length > 0) {
          setFeed((prevFeed) => [...prevFeed, ...res.data.content]);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        alert("더 이상 불러올 게시물이 없습니다.");
        setLoading(false);
      });
  }, [page]);

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
        {feed.map((v, i) => {
          if (i === feed.length - 1) {
            return (
              <div ref={lastPostRef} key={v.bid}>
                <MainFeed
                  uimg={v.uimg}
                  uuid={v.uid}
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
              </div>
            );
          } else {
            return (
              <div key={v.bid}>
                <MainFeed
                  uimg={v.uimg}
                  uuid={v.uid}
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
              </div>
            );
          }
        })}
        {loading && <div>Loading...</div>}
        {!hasMore && <div>No more posts</div>}
      </div>
    </>
  );
}

export default Main;
