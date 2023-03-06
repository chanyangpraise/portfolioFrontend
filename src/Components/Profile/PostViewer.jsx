import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PostEditor from './PostEditor';
import { useDispatch, useSelector } from 'react-redux';
import { setEditorBid } from '/src/redux/store/store.js';

const PostViewer = ({ open, onClose, bid, bimg }) => {
  if (!open) return null;

  const [openEditor, setOpenEditor] = useState(false);
  const [userName, setUserName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [content, setContent] = useState(''); //
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const userId = useSelector((store) => {
    return store.loginState.userId;
  });

  const dispatch = useDispatch();
  const editorBid = bid;
  dispatch(setEditorBid(editorBid));

  const getId = 3; //임의의 값

  const handleClick = () => {
    dispatch({ type: 'SET_EDITOR_BID', payload: editorBid });
  };

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
      .then((res) => {
        setComments(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bid]);

  //서버에서 좋아요 가져오기
  useEffect(() => {
    axios
      .get(`http://13.125.96.165:3000/board/like/count?bid=${bid}`)
      .then((res) => {
        setLikeCount(res.data.count);
        console.log(res.data.count);
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
        .then((res) => {
          alert(res.data.message);
          setIsLiked(true);
        });
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
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
            <img src={bimg} alt="img1" className="view_img" />
          </div>
          <div className="modalVRight">
            <button
              className="postEditbtn"
              onClick={() => {
                setOpenEditor(true);
                handleClick();
              }}
            >
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
              <div className="modalContentDetail">{content}</div>
              <div className="modalComments">
                {comments.map((comment) => (
                  <div className="commentBox" key={comment.cid}>
                    <div className="commentUser">
                      <img
                        className="commentUimg"
                        src={comment.uimg || '/src/asset/defaultProfile.png'}
                        alt="user profile"
                      />
                      <div className="commentEmail">
                        {comment.email}
                        {console.log(comment.email)}
                      </div>
                    </div>
                    <div className="commentContent">{comment.content}</div>
                    {userId === comment.uid && (
                      <>
                        <button
                          onClick={() => {
                            const newContent =
                              prompt('수정할 내용을 입력하세요');
                            if (newContent) {
                              axios
                                .put(
                                  `http://13.125.96.165:3000/comment/fix/${comment.cid}`,
                                  {
                                    userId,
                                    content: newContent,
                                  }
                                )
                                .then((res) => {
                                  alert(res.data.message);
                                  // 댓글 목록 새로고침
                                  axios
                                    .get(
                                      `http://13.125.96.165:3000/comment/get/${bid}`
                                    )
                                    .then((res) => {
                                      setComments(res.data.content);
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }
                          }}
                        >
                          수정하기
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('정말로 삭제하시겠습니까?')) {
                              axios
                                .delete(
                                  `http://13.125.96.165:3000/comment/delete/${comment.cid}?uid=${userId}`
                                )
                                .then((res) => {
                                  alert(res.data.message);
                                  // 댓글 목록 새로고침
                                  axios
                                    .get(
                                      `http://13.125.96.165:3000/comment/get/${bid}`
                                    )
                                    .then((res) => {
                                      setComments(res.data.content);
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }
                          }}
                        >
                          삭제하기
                        </button>
                      </>
                    )}
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
              <div className="howmanyLikes">{likeCount}개</div>
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
