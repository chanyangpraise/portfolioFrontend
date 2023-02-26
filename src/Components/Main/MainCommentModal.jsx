import React, { forwardRef } from "react";
import "./MainCommentModal.css";

const MainCommentModal = forwardRef(({ cmtSubmit, cmtTextAdd, comment }, commentTextArea) => {
  return (
    <>
      <div className="main_comment_modal_wrap">
        <form onSubmit={cmtSubmit}>
          <div className="main_comment_modal_in_wrap">
            <span className="main_comment_close_button">x</span>
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
});

export default MainCommentModal;
