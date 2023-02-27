import React, { useState } from 'react';
import './Profile.css';
import '../Components/Profile/css/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Components/Profile/Modal';
import PostEditor from '../Components/Profile/PostEditor';
import PostViewer from '../Components/Profile/PostViewer';

function Profile() {
  const [openModal, setOpenModal] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [openViewer, setOpenViewer] = useState(false);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };
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
                others?'” - MLK.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="g_container">
        <div className="gallery">
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

export default Profile;
