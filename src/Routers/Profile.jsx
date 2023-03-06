import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import '../Components/Profile/css/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import PostViewer from '../Components/Profile/PostViewer';
import Modal from '../Components/Profile/Modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileUserEmail } from '../redux/store/store';
import { setUserProfileImg } from '../redux/store/store';

function Profile() {
  // axios.defaults.baseURL  = 'http://13.125.96.165:3000';

  //모달
  const [openModal, setOpenModal] = useState(false); // 열고닫음전달 state
  const [openViewer, setOpenViewer] = useState(false); // 열고닫음전달 state
  const [selectedBid, setSelectedBid] = useState(null); // bid 전달 state
  const [selectedBimg, setSelectedBimg] = useState(null); // bimg 전달 state

  const [countPosts, setCountPosts] = useState(0); // 게시물 카운팅
  const [followers, setFollowers] = useState(0); //팔로워 카운팅
  const [following, setFollowing] = useState(0); //팔로우 카운팅

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const getId = '3';

  const [file, setFile] = useState(null);

  const userId = useSelector((store) => {
    return store.loginState.userId;
  });
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  //userImg 전달
  const userProfileImg = avatarUrl;
  dispatch(setUserProfileImg(userProfileImg));

  //userEmail 전달
  const ProfileUserEmail = userEmail;
  dispatch(setProfileUserEmail(ProfileUserEmail));

  useEffect(() => {
    //컴포넌트 렌더링 되자마자 바로 6개 일단 불러오게
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치
      const scrollTop = document.documentElement.scrollTop;
      // 문서의 전체 높이
      const scrollHeight = document.documentElement.scrollHeight;
      // 브라우저 창의 높이
      const clientHeight = document.documentElement.clientHeight;

      // 스크롤이 페이지의 하단에 도달했다면 fetchPosts 함수 호출
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log('스크롤 하단 도달!! fetchPosts 함수를 호출합니다.');
        fetchPosts();
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `http://13.125.96.165:3000/board/get/user/${userId}?page=${page}&count=6`
      );
      setPosts(posts.concat(res.data.content));
      setPage((prevPage) => prevPage + 1);
      // console.log(posts);
      // console.log(`page는 ${page} 입니다.`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    handleUpload();
  };

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
    formData.append('userId', userId);
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
      .get(`http://13.125.96.165:3000/board/get/count/${userId}`)
      .then((res) => {
        setCountPosts(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      });

    //팔로워 카운트
    axios
      .get(`http://13.125.96.165:3000/profile/follower/${userId}`)
      .then((res) => {
        setFollowers(res.data.follower.length);
      })
      .catch((err) => {
        console.error(err);
      });

    //팔로우 카운트
    axios
      .get(`http://13.125.96.165:3000/profile/following/${userId}`)
      .then((res) => {
        setFollowing(res.data.follower.length);
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
          {/* 모달 / 게시물 수정 테스트 
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
          </div> */}

          <PostViewer
            open={openViewer}
            onClose={() => setOpenViewer(false)}
            bid={selectedBid}
            bimg={selectedBimg}
          />

          {posts.map((post, index) => (
            <div className="galleryContainer">
              <div
                className="g_item"
                key={index}
                onClick={() => {
                  setOpenViewer(true);
                  setSelectedBid(post.bid);
                  setSelectedBimg(post.bimg);
                }}
              >
                <img src={post.bimg} className="g_image" alt={`img${index}`} />
                <div className="g_item_info">
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
