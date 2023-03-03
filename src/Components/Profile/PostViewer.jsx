import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import PostEditor from './PostEditor';

const PostViewer = ({ open, onClose }) => {
  if (!open) return null;

  const [openEditor, setOpenEditor] = useState(false);
  const [userName, setUserName] = useState(null)
  const [avatar, setAvatar] = useState(null);
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');

  const userId = 8;
  const getId = 3;

  useEffect(() => {
    axios
      .get(`http://13.125.96.165:3000/profile/get/${userId}?getId=${getId}`)
      .then((res) => {
        if (res.data.status === 'success' && res.data.info.uimg) {
          setAvatar(res.data.info.uimg);
        } else {
          setAvatar('/src/asset/defaultProfile.png');
        }
      })
      .catch((err) => {
        console.error(err);
        setAvatar('/src/asset/defaultProfile.png');
      });
  }, []);

    // 서버에서 사용자 이메일 가져오기
    useEffect(() => {
      axios
        .get(`http://13.125.96.165:3000/profile/get/${userId}?getId=${getId}`)
        .then((res) => {
          if (res.data.status === 'success' && res.data.info.email) {
            setUserName(res.data.info.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    const userId = 3;
    const bid = 55;
    // POST 요청
    axios
      .post('http://13.125.96.165:3000/comment/write', {
        userId,
        content: comment,
        bid,
      })
      .then((res) => {
        console.log(res.data);
        alert('댓글이 성공적으로 작성되었습니다.');
        setComment('');
      })
      .catch((err) => {
        console.error(err);
        alert('서버에서 에러가 발생했습니다.');
      });
  };

  // const handleDelete

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
            <button className="postEditbtn" onClick={() => setOpenEditor(true)}>
              게시글 수정하기
            </button>
            <PostEditor
              open={openEditor}
              onClose={() => setOpenEditor(false)}
            />

            <div className="modalProfile">
              <div className="modalUser">
                <img src={avatar} alt="" className="modalPImg" />
                <div className='modalUsername'>{userName}</div>
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
