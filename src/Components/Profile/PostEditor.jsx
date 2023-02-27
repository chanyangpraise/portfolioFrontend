import React, { useState } from 'react';
import axios from 'axios';

const PostEditor = ({ open, onClose }) => {
  const [showImageForm, setShowImageForm] = useState(false);
  const [showContentForm, setShowContentForm] = useState(false);
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5173/change-image', { image });
      setShowImageForm(false);
      setImage('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitContent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5173/change-content', { content });
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
            {showImageForm ? (
              <form className="modalForm" onSubmit={handleSubmitImage}>
                <input
                  className="modalInput"
                  type="file"
                  placeholder="새로운 이미지를 업로드 하세요"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <button className="formBtn" type="submit">
                  변경
                </button>
                <button
                  className="formBtn"
                  onClick={() => setShowImageForm(false)}
                >
                  취소
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowImageForm(true)}
              >
                이미지 수정
              </button>
            )}

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
