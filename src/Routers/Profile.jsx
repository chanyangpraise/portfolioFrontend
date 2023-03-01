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
  const [openModal, setOpenModal] = useState(false);

  const [galleryItems, setGalleryItems] = useState([]); // FIXME: Gallery get
  const [avatar, setAvatar] = useState(null); // FIXME: Avatar

  const [openViewer, setOpenViewer] = useState(false);

  const [posts, setPosts] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const [file, setFile] = useState(null);
  const userId = '1'; //임의의 시용자 아이디

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  
  //프로필 이미지 업로드
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);
    
    axios
    .post('/upload', formData)
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((err) => {
      console.error(err);
    });
  };
  
  // 프로필 이미지 삭제
    const handleDelete = () => {
      axios
        .delete(`http://13.125.96.165:3000/profile-image/${userId}`)
        .then((res) => {
          console.log(res.data.message);
          alert("업로드가 완료되었습니다. 새로고침 하세요.")
        })
        .catch((err) => {
          console.error(err);
          alert("서버에 에러가 발생했습니다. 잠시 후 다시 시도하세요.")
        });
    };
    
  // ------------------ //
  
  useEffect(() => {
    //게시글 카운트
    axios
      .get('http://13.125.96.165:3000/board/get/count/1')
      .then((res) => {
        setPosts(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      });

    //팔로워 카운트
    axios
      .get('http://13.125.96.165:3000/profile/follower/1')
      .then((res) => {
        setFollowers(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      });

    //팔로우 카운트
    axios
      .get('http://13.125.96.165:3000/profile/following/1')
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
              <label onClick={handleUpload} htmlFor="image">
                프로필 사진 업로드
              </label>

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

          {/* FIXME: AXIOS 받을 수 있도록 fix: editlater.jsx보고 해결 */}
          {galleryItems.map((item, index) => (
            <div
              className="g_item"
              key={index}
              onClick={() => setOpenViewer(true)}
            >
              <img src={item.btimg} className="g_image" alt={`img${index}`} />
              <div className="g_item_info">
                <ul>
                  <li className="g_item_likes">
                    <FontAwesomeIcon icon={faHeart} /> {item.b_comment}
                  </li>
                  <li className="g_item_comments">
                    <FontAwesomeIcon icon={faComment} /> {item.b_uid}
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
