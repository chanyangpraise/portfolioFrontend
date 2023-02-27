import React, { useState, useEffect } from 'react';
import './Profile.css';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faGear, faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import axios from 'axios';

function Profile() {
  const [openModal, setOpenModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [page, setPage] = useState(1); // 페이지 수를 저장하는 state
  const [galleryItems, setGalleryItems] = useState([]); // 받아온 정보를 저장하는 state
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null); //선택한 갤러리 이미지 정보 state
  const [editedPostContent, setEditedPostContent] = useState(''); //수정한 갤러리 게시물 정보 state

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  /**스크롤 이벤트 처리 함수*/
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight &&
      galleryItems.length >= page * 6
    ) {
      // galleryItems 배열의 길이가 현재 페이지 수 * 6보다 크거나 같은 경우에만 다음 페이지를 가져오도록 함
      setPage(page + 1);
    }
  };

// 모달컴포넌트에에 props로 전달됨
  const handleEditPost = () => {

  };

  const handleDeletePost = () => {
  
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 제거
    };
  });

  useEffect(() => {
    // 백엔드 서버에게 요청을 보내는 함수
    const fetchGalleryItems = async () => {
      const res = await axios.get('/get/main', {
        params: {
          page: page, // 현재 페이지 수 전달
          count: 6, //6개 요청
          comments: b_comment,
          likes:
        },
      });
      setGalleryItems([...galleryItems, ...res.data]); // 기존 정보와 새로 받은 정보를 합쳐서  state 변수에 저장
    };
    fetchGalleryItems();
  }, [page]); // 페이지 수가 변경될 때마다 요청 보냄

  // ------------------ //

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
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <label for="avatar">프로필 사진 변경</label>

              <button
                className="p_btn p_edit_btn modalBtn"
                onClick={() => setOpenModal(true)}
              >
                계정 설정
              </button>
              {/* <FontAwesomeIcon icon={faGear} size="10x" /> */}
              <Modal open={openModal} onClose={() => setOpenModal(false)} />
            </div>

            <div className="p_stats">
              <ul>
                <li>
                  게시물 <span className="p_stat">164</span>
                </li>
                <li>
                  팔로워 <span className="p_stat">188</span>
                </li>
                <li>
                  팔로우 <span className="p_stat">206</span>
                </li>
              </ul>
            </div>
            <div className="p_bio">
              <p className="p_explain">
                Apple CEO Auburn 🏀 🏈 Duke 🏀 National Parks 🏞️ “Life's most
                persistent and urgent question is, 'What are you doing for
                others?'” - MLK.{' '}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="g_container">
        <div className="gallery">
          {/* state에 저장된 정보를 map으로 갤러리 아이템 생성 */}
          {galleryItems.map((item, index) => (
            <div
              className="g_item"
              key={index}
              onClick={() => setSelectedGalleryItem(item)}
            >
              <img src={item.url} className="g_image" alt={`img${index}`} />
              <div className="g_item_info">
                <ul>
                  <li className="g_item_likes">
                    <FontAwesomeIcon icon={faHeart} /> {item.likes}
                  </li>
                  <li className="g_item_comments">
                    <FontAwesomeIcon icon={faComment} /> {item.comments}
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
