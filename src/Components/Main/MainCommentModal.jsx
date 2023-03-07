import axios from "axios";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "./MainCommentModal.css";

function MainCommentModal({ comment, setComment, setCmtModal, commentIndex, post, setPost, setCmt }) {
  const commentTextArea = useRef();

  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const { userId, email, uimg } = useSelector((store) => {
    return store.loginState;
  });

  const cmtTextAdd = (e) => {
    setComment(e.target.value);
    // textarea ResizeHeight //
    commentTextArea.current.style.height = "auto"; //height 초기화
    commentTextArea.current.style.height = commentTextArea.current.scrollHeight + "px";
  };

  const cmtSubmit = (e) => {
    e.preventDefault();
    // 댓글 작성
    axios
      .post("http://13.125.96.165:3000/comment/write", {
        userId: userId,
        content: comment,
        bid: commentIndex,
      })
      .then((res) => {
        const date = new Date();
        setCmtModal(false);
        setCmt(
          {
            cid: res.data.cid,
            content: comment,
            date: date.toString(),
            email: email,
            uid: userId,
            uimg: uimg,
          },
          commentIndex
        );
      })
      .catch((err) => console.log(err));

    setComment("");
    // Submit 했을때 textarea height 초기화
    commentTextArea.current.style.height = "auto";
    // textarea의 값이 빈 값일때 Submit 안되게
    if (comment === "") {
      return;
    }
    post[commentIndex].comment = [comment, ...post[commentIndex].comment];
    setPost([...post]);
    console.log(post);
    // 배열에 담기
  };
  return (
    <>
      <div className="main_comment_modal_wrap">
        <form onSubmit={cmtSubmit}>
          <div className="main_comment_modal_in_wrap">
            <span className="main_comment_close_button" onClick={() => setCmtModal(false)}>
              x
            </span>
            <textarea
              ref={commentTextArea}
              onChange={cmtTextAdd}
              className="main_comment_modal_textarea"
              type="text"
              placeholder="댓글을 입력해주세요."
              rows={1}
              value={comment}
            />
            <button className="main_comment_button">Send</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MainCommentModal;
