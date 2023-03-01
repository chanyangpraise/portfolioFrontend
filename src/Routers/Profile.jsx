import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import '../Components/Profile/css/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import PostEditor from '../Components/Profile/PostEditor';
import PostViewer from '../Components/Profile/PostViewer';
import Modal from '../Components/Profile/Modal';
import axios from 'axios';

function Profile() {
  //모달
  const [openModal, setOpenModal] = useState(false);
  const [openViewer, setOpenViewer] = useState(false);

  const [posts, setPosts] = useState(0); // 게시물 카운팅
  const [followers, setFollowers] = useState(0); //팔로워 카운팅
  const [following, setFollowing] = useState(0); //팔로우 카운팅

  const [post, setPost] = useState([]); // 갤러리 게시물 state
  const [page, setPage] = useState(0); // 페이지 번호 state
  const [loading, setLoading] = useState(false); // 로딩 state

  const [avatar, setAvatar] = useState(null); // FIXME: Avatar

  const userId = '3'; //임의의 시용자 아이디
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchPosts = async () => {
    setLoading(true); // 로딩 시작
    try {
      const res = await axios.get('/get/main', { params: { page } }); // 백엔드에 GET 요청 보내기
      if (res.data.status === 'success') {
        setPost((prev) => [...prev, ...res.data.content]); // 기존 게시물과 새로운 게시물 합치기
        setPage((prev) => prev + 1); // 페이지 번호 증가시키기
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false); // 로딩 끝
  };

  // 파일 업로드 버튼 클릭 시 서버에 요청
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', 3);
    console.log(file);
    console.log(userId);
    try {
      const res = await axios.post(
        'http://13.125.96.165:3000/users/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(res.data.message);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement; // 문서의 스크롤 위치 / 높이 정보 가져오기
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      // 스크롤이 맨 밑까지 내려왔고 로딩 중이 아니라면 ?
      fetchPosts();
      // 백엔드로부터 게시물 가져오기
    }
  };

  // 프로필 이미지 삭제
  const handleDelete = () => {
    axios
      .delete(`http://13.125.96.165:3000/users/profile-image/${userId}`)
      .then((res) => {
        console.log(res.data.message);
        alert('업로드가 완료되었습니다. 새로고침 하세요.');
      })
      .catch((err) => {
        console.error(err);
        alert('서버에 에러가 발생했습니다. 잠시 후 다시 시도하세요.');
      });
  };

  // ------------------ //

  //스크롤 이벤트
  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너
    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 리스너 해제
    };
  }, []);

  useEffect(() => {
    // 페이지 번호가 변경될 때마다 실행되도록 page 상태 전달
    fetchPosts(); // 백엔드로부터 게시물 가져오기
  }, [page]);

  useEffect(() => {
    //게시글 카운트
    axios
      .get('http://13.125.96.165:3000/board/get/3')
      .then((res) => {
        setPosts(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      });

    //팔로워 카운트
    axios
      .get('http://13.125.96.165:3000/profile/follower/3')
      .then((res) => {
        setFollowers(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      });

    //팔로우 카운트
    axios
      .get('http://13.125.96.165:3000/profile/following/3')
      .then((res) => {
        setFollowing(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="profile_main">
      <header>
        <div className="page_container p_container">
          <div className="profile">
            <div className="p_image">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="프로필"
                  className="p_img"
                />
              ) : (
                <img
                  src="https://i.ibb.co/G54dpvC/tim-cook-image.png"
                  alt="프로필"
                  className="p_img"
                />
              )}
            </div>

            <div className="p_user_settings">
              <h1 className="p_user_name">tcook@apple.com</h1>

              <input
                className="p_avatarInput"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="image">프로필 사진 선택</label>
              <button onClick={handleUpload}>업로드</button>

              <button
                className="p_btn p_edit_btn modalBtn"
                onClick={handleDelete}
              >
                프로필 사진 삭제
              </button>

              <button
                className="p_btn p_edit_btn modalBtn"
                onClick={() => setOpenModal(true)}
              >
                계정 설정
              </button>
              <Modal open={openModal} onClose={() => setOpenModal(false)} />
            </div>

            <div className="p_stats">
              <ul>
                <li>
                  게시물 <span className="p_stat">{posts}</span>
                </li>
                <li>
                  팔로워 <span className="p_stat">{followers}</span>
                </li>
                <li>
                  팔로우 <span className="p_stat">{following}</span>
                </li>
              </ul>
            </div>
            <div className="p_bio">
              <p className="p_explain">
                Apple CEO Auburn 🏀 Duke 🏀 National Parks 🏞️ “Life's most
                persistent and urgent question is, 'What are you doing for
                others?'” - MLK.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="g_container">
        <div className="gallery">
          {/* 모달 테스트 */}
          <div className="g_item" onClick={() => setOpenViewer(true)}>
            <img
              src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
              className="g_image"
              alt="img1"
            />
            <div className="g_item_info">
              <ul>
                <li className="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} /> 70만
                </li>
                <li className="g_item_comments">
                  <FontAwesomeIcon icon={faComment} /> 1.9만
                </li>
              </ul>
            </div>
          </div>
          <PostViewer open={openViewer} onClose={() => setOpenViewer(false)} />

          {post.map((item, index) => (
            <div
              className="g_item"
              key={index}
              onClick={() => setOpenViewer(true)}
            >
              <img src={item.btimg} className="g_image" alt={`img${index}`} />
              <div className="g_item_info">
                <ul>
                  <li className="g_item_likes">
                    <FontAwesomeIcon icon={faHeart} />
                  </li>
                  <li className="g_item_comments">
                    <FontAwesomeIcon icon={faComment} />
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
