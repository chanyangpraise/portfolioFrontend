import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PostEditor = ({ open, onClose }) => {
  const [showContentForm, setShowContentForm] = useState(false);
  const [content, setContent] = useState('');
  const uid = useSelector((store) => {
    return store.loginState.userId;
  });

  const editorBid = useSelector((state) => state.editorState.editorBid);

  // 게시글 수정(완)
  const handleSubmitContent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://13.125.96.165:3000/board/update/${editorBid}`, {
        content,
        uid,
      });
      setShowContentForm(false);
      setContent('');
      console.log(editorBid);
      alert('성공적으로 수정이 완료되었습니다. 새로고침 하세요.');
    } catch (error) {
      console.log(error);
    }
  };

  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <div className="modalSettings">
          <p onClick={onClose} className="modalCloseBtn">
            X
          </p>
          <div className="btnContainer">
            {showContentForm ? (
              <form className="modalForm" onSubmit={handleSubmitContent}>
                <textarea
                  className="modalTxtarea"
                  placeholder="수정될 글 내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button className="formBtn" type="submit">
                  변경
                </button>
                <button
                  className="formBtn"
                  onClick={() => setShowContentForm(false)}
                >
                  취소
                </button>
              </form>
            ) : (
              <button
                className="changeBio"
                onClick={() => setShowContentForm(true)}
              >
                글 내용 변경
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
