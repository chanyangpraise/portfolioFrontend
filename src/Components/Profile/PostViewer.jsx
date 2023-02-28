import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const PostViewer = ({ open, onClose }) => {
  if (!open) return null;

  const userName = 'tcook@apple.com';
  const modalProfile = 'https://i.ibb.co/G54dpvC/tim-cook-image.png';
  const content = 'I think React is really Cool!';
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    const userId = 1;
    const bid = 1;
    // POST 요청
    axios
      .post('/write', {
        userId,
        content: comment,
        bid,
      })
      .then((res) => {
        console.log(res.data);
        alert('댓글이 작성되었습니다.');
        setComment('');
      })
      .catch((err) => {
        console.error(err);
        alert('서버에서 에러가 발생했습니다.');
      });
  };

  return (
    <div className="modalOverlay">
      <div className="modalVContainer">
        <div className="modalVSettings">
          <p onClick={onClose} className="modalCloseBtn">
            X
          </p>
          <div className="modalVLeft">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/88/Height_demonstration_diagram.png"
              alt="img1"
              className="view_img"
            />
          </div>
          <div className="modalVRight">
            <div className="modalProfile">
              <div className="modalUsername">
                <img src={modalProfile} alt="" className="modalPImg" />
                {userName}
              </div>
            </div>
            <div className="modalContent">{content}</div>
            <div className="modalLike">
              <FontAwesomeIcon icon={faHeart} size="3x" />
            </div>
            <div className="modalComments">
              <input type="text" value={comment} onChange={handleChange} />
              <button className="modalComments" onClick={handleSubmit}>
                댓글 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostViewer;
