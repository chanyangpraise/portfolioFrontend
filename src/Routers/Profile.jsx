import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import '../Components/Profile/css/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import PostViewer from '../Components/Profile/PostViewer';
import Modal from '../Components/Profile/Modal';
import axios from 'axios';

function Profile() {
  // axios.defaults.baseURL  = 'http://13.125.96.165:3000';

  const containerRef = useRef(null);

  //모달
  const [openModal, setOpenModal] = useState(false);
  const [openViewer, setOpenViewer] = useState(false);

  const [countPosts, setCountPosts] = useState(0); // 게시물 카운팅
  const [followers, setFollowers] = useState(0); //팔로워 카운팅
  const [following, setFollowing] = useState(0); //팔로우 카운팅

  const [postComments, setPostComments] = useState(0); // 게시물 `댓글`갯수 받아오기 TODO: 각 게시물에 맞는 좋아요/댓글 수를 받아와야 하는데... 나는 map으로 순회하고.. 어케하노
  const [postLikes, setPostLikes] = useState(0); // 게시물 `좋아요` 갯수 받아오기 TODO:
  // const [loading, setLoading] = useState(true); // 로딩 state ... 어려워서 나주엥

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const userId = '8'; //임의의 사용자 아이디  FIXME:나중에 사용자 로그인하면 그값을 props로 넘겨주면 될듯
  const getId = '3'; // 임의값: 프로필 사진 불러오기용

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    handleUpload();
  };

  // 최신게시물 6개 불러오기
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const count = 6;

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      axios
        .get(
          `http://13.125.96.165:3000/board/get/main?page=${page}&count=${count}`
        )
        .then((res) => {
          if (res.data.status === 'success') {
            setPosts((prevPosts) => [...prevPosts, ...res.data.content]);
            setPage(res.data.nextPage);
          }
        })
        .catch((err) => console.error(err));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  // 서버에서 사용자 프로필 이미지 가져오기
  useEffect(() => {
    axios
      .get(`http://13.125.96.165:3000/profile/get/${userId}?getId=${getId}`)
      .then((res) => {
        if (res.data.status === 'success' && res.data.info.uimg) {
          setAvatarUrl(res.data.info.uimg);
        } else {
          setAvatarUrl('/src/asset/defaultProfile.png');
        }
      })
      .catch((err) => {
        console.error(err);
        setAvatarUrl('/src/asset/defaultProfile.png');
      });
  }, []);

  // 서버에서 사용자 이메일 가져오기
  useEffect(() => {
    axios
      .get(`http://13.125.96.165:3000/profile/get/${userId}?getId=${getId}`)
      .then((res) => {
        if (res.data.status === 'success' && res.data.info.email) {
          setUserEmail(res.data.info.email);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // 파일 업로드 버튼 클릭 시 서버에 요청
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', 8);
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

  // 프로필 사진 수정
  const handleFileModified = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    axios
      .put(`http://13.125.96.165:3000/profile-image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('프로필 수정 성공: ');
        console.log(response.data);
      })
      .catch((error) => {
        console.log('프로필 수정 오류: ');
        console.error(error);
      });
  };

  // 프로필 이미지 삭제
  const handleDelete = () => {
    axios
      .delete(`http://13.125.96.165:3000/users/profile-image/${userId}`)
      .then((res) => {
        console.log('프로필 이미지 삭제 성공: ');
        console.log(res.data.message);
        alert('삭제가 완료되었습니다. 새로고침 하세요.');
      })
      .catch((err) => {
        console.log('프로필 이미지 삭제 오류 발생: ');
        console.error(err);
        alert('서버에 에러가 발생했습니다. 잠시 후 다시 시도하세요.');
      });
  };

  // ------------------------------------------------------ //

  useEffect(() => {
    //게시글 카운트
    axios
      .get('http://13.125.96.165:3000/board/get/3')
      .then((res) => {
        setCountPosts(res.data.count);
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
              <img src={avatarUrl} alt="profile_image" className="p_img" />
            </div>

            <div className="p_user_settings">
              <h1 className="p_user_name">{userEmail}</h1>

              <input
                className="p_avatarInput"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="image">프로필 사진 업로드</label>

              <input
                className="p_avatarInput"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onClick={handleFileModified}
              />
              <label htmlFor="image">프로필 사진 수정</label>

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
                  게시물 <span className="p_stat">{countPosts}</span>
                </li>
                <li>
                  팔로워 <span className="p_stat">{followers}</span>
                </li>
                <li>
                  팔로우 <span className="p_stat">{following}</span>
                </li>
              </ul>
            </div>
            {/* <div className="p_bio">
              <p className="p_explain">
                Apple CEO Auburn 🏀 Duke 🏀 National Parks 🏞️ “Life's most
                persistent and urgent question is, 'What are you doing for
                others?'” - MLK.
              </p>
            </div> */}
          </div>
        </div>
      </header>

      <div className="g_container">
        <div className="gallery">
          {/*  모달 / 게시물 수정 테스트  */}
          <div className="g_item" onClick={() => setOpenViewer(true)}>
            <img
              src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
              className="g_image"
              alt="img1"
            />
            <div className="g_item_info">
              <ul>
                <li className="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} />
                  {postLikes}
                </li>
                <li className="g_item_comments">
                  <FontAwesomeIcon icon={faComment} />
                  {postComments}
                </li>
              </ul>
            </div>
          </div>
          <PostViewer open={openViewer} onClose={() => setOpenViewer(false)} />

          {posts.map((post, index) => (
            <div ref={containerRef} className="scroll-container">
              <div
                className="g_item"
                key={index}
                onClick={() => setOpenViewer(true)}
              >
                <img src={post.bimg} className="g_image" alt={`img${index}`} />
                <div className="g_item_info">
                  <ul>
                    <li className="g_item_likes">
                      <FontAwesomeIcon icon={faHeart} /> {postLikes}
                    </li>
                    <li className="g_item_comments">
                      <FontAwesomeIcon icon={faComment} /> {postComments}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
