import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Main.css";
import MainCommentModal from "../Components/Main/MainCommentModal";
import MainBoard from "../Components/Main/MainBoard";
import axios from "axios";
import MainFeed from "../Components/Main/MainFeed";
import upBtn from "../asset/upBtn.svg";
import { useSelector } from "react-redux";

function Main() {
  const [text, setText] = useState();
  const [img, setImg] = useState();
  const [post, setPost] = useState([]);
  const [commentIndex, setCommentIndex] = useState();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  //MainComment,MainCommentModal
  const [cmtModal, setCmtModal] = useState(false);
  const [comment, setComment] = useState("");
  const observer = useRef();
  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const userId = useSelector((store) => {
    return store.loginState.userId;
  });

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
      .get(`http://13.125.96.165:3000/board/get/main?page=${page}&count=6&userId=${userId}`)
      .then((res) => {
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

  //업버튼 클릭 핸들러
  const TopBtnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addCmt = (cmtList, bIdx) => {
    const newFeed = feed.map((v) => {
      if (v.bid === bIdx) {
        v.cmt = cmtList;
      }
      return v;
    });
    setFeed(newFeed);
  };

  const setCmt = (comment, bIdx) => {
    const newFeed = feed.map((v) => {
      if (v.bid === bIdx) {
        v.cmt.unshift(comment);
      }
      return v;
    });
    setFeed(newFeed);
  };
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
              setCmt={setCmt}
            />
          )}
        </div>
        {console.log(feed)}
        {feed.map((v, i) => {
          if (i === feed.length - 1) {
            return (
              <div ref={lastPostRef} key={v.bid}>
                <MainFeed
                  addCmt={addCmt}
                  follow={v.following}
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
                  cmtList={v.cmt}
                />
              </div>
            );
          } else {
            return (
              <div key={v.bid}>
                <MainFeed
                  follow={v.following}
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
                  cmtList={v.cmt}
                  addCmt={addCmt}
                />
              </div>
            );
          }
        })}
        {loading && <div>Loading...</div>}
        {!hasMore && <div>No more posts</div>}
        <span onClick={TopBtnClick} className="upImg">
          <img style={{ width: "3vw" }} src={upBtn} alt=""></img>
        </span>
      </div>
    </>
  );
}

export default Main;
