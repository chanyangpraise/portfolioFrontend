import React, { useState } from 'react';
import axios from 'axios';

const PostEditor = ({ open, onClose }) => {
  const [showContentForm, setShowContentForm] = useState(false);
  const [content, setContent] = useState('');
  const bid = 57;
  const uid = 8;

  //FIXME: 게시글 수정(not found - 아마도 백엔드쪽 문제일듯)
  const handleSubmitContent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5173/board/update/${bid}`, { content, uid });
      setShowContentForm(false);
      setContent('');
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
