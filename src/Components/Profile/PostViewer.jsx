import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PostEditor from './PostEditor';

const PostViewer = ({ open, onClose }) => {
  if (!open) return null;

  const [openEditor, setOpenEditor] = useState(false);
  const [userName, setUserName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [content, setContent] = useState(''); //
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const bid = 57;
  const userId = 8;
  const getId = 3;

  //서버에서 특정 게시물의 '게시글'(b_content) 가져오기
  useEffect(() => {
    fetch(`http://13.125.96.165:3000/board/get/board/${bid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setContent(data.content);
        } else {
          console.error(err);
        }
      });
  }, []);

  //서버에서 특정 게시물의 `댓글`(comments) 가져오기
  useEffect(() => {
    axios
      .get(`http://13.125.96.165:3000/comment/get/${bid}`)
      .then((response) => {
        setComments(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bid]);

  //서버에서 좋아요 가져오기 (작동안함)
  useEffect(() => {
    axios
      .get(`http://13.125.96.165:3000/board/like/count?bid=${bid}`)
      .then((response) => {
        setLikeCount(response.data.count);
        console.log('SetLikeCount 지났음.');
        console.log(likeCount);
      });
  }, []);

  //서버에서 모달에게 사용자 프로필 넘겨받기
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

  // 해당 게시물 좋아요 했는지 확인 (boolean)?
  useEffect(() => {
    axios
      .get('http://13.125.96.165:3000/board/like/check', {
        params: {
          uid: userId,
          bid: bid,
        },
      })
      .then((res) => {
        setIsLiked(res.data.isLiked);
      });
  }, []);

  //좋아요 얼마나 있어?
  const howManyLikes = () => {
    return likeCount;
  };

  //좋아요 POST/DELETE 함수!!
  const handleLiked = () => {
    if (isLiked) {
      // 좋아요 취소
      axios
        .delete(`http://13.125.96.165:3000/board/like/${bid}/${userId}`)
        .then((res) => {
          alert(res.data.message);
          setIsLiked(false);
        });
    } else {
      // 좋아요
      axios
        .post('http://13.125.96.165:3000/board/like', {
          uid: userId,
          bid: bid,
        })
        .then((response) => {
          alert(response.data.message);
          setIsLiked(true);
        });
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    const userId = 8;
    const bid = 57; // userId가 57번 게시물에 댓글이 적어지고 userId가 3이면 55번 게시물에 적어짐. 이거 뭐임?
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
                <div className="modalUsername">{userName}</div>
              </div>
            </div>
            <div className="modalContent">
              {content}
              <div className="modalComments">
                {comments.map((comment) => (
                  <div className="commentBox" key={comment.cid}>
                    <div className="commentEmail">{comment.email}</div>
                    <div className="commentContent">{comment.content}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modalWriteComment">
              <div className="modalLike">
                {isLiked ? (
                  <FontAwesomeIcon
                    icon={solidHeart}
                    size="3x"
                    onClick={handleLiked}
                    cursor={'pointer'}
                    color={'red'}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={regularHeart}
                    size="3x"
                    onClick={handleLiked}
                    cursor={'pointer'}
                    color={'red'}
                  />
                )}
              </div>
              <div className="howmanyLike">{howManyLikes}</div>
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
    </div>
  );
};

export default PostViewer;
