import React, { useRef } from "react";
import "./MainCommentModal.css";

function MainCommentModal({ comment, setComment, setCmtModal, commentIndex, post, setPost }) {
  const commentTextArea = useRef();

  console.log(post);
  const cmtTextAdd = (e) => {
    setComment(e.target.value);
    // textarea ResizeHeight //
    commentTextArea.current.style.height = "auto"; //height 초기화
    commentTextArea.current.style.height = commentTextArea.current.scrollHeight + "px";
  };

  const cmtSubmit = (e) => {
    e.preventDefault();
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
    setCmtModal(false);
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
