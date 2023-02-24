import React, { useState } from 'react';
import './Profile.css';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faGear, faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import ProfileModal from './ProfileModal';

function Profile() {
  const [openModal, setOpenModal] = useState(false);

  // ------------------ //

  return (
    <div className="profile_main">
      <header>
        <div className="page_container p_container">
          <div className="profile">
            <div className="p_image">
              <img
                src="https://i.ibb.co/G54dpvC/tim-cook-image.png"
                alt="프로필"
                className="p_img"
              />
            </div>

            <div className="p_user_settings">
              <h1 className="p_user_name">Tim Cook</h1>

              <input
                className="p_avatarInput"
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
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
                others?'” - MLK. p.s. You know what? I'm gay.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="g_container">
        <div className="gallery">
          <div className="g_item">
            <img
              src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
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
          <div className="g_item">
            <img
              src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
              className="g_image"
              alt="img2"
            />

            <div className="g_item_info">
              <ul>
                <li className="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} /> 31.5만
                </li>
                <li className="g_item_comments">
                  <FontAwesomeIcon icon={faComment} /> 5만
                </li>
              </ul>
            </div>
          </div>
          <div className="g_item">
            <img
              src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
              className="g_image"
              alt="img3"
            />

            <div className="g_item_info">
              <ul>
                <li className="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} /> 20.3만
                </li>
                <li className="g_item_comments">
                  <FontAwesomeIcon icon={faComment} /> 4만
                </li>
              </ul>
            </div>
          </div>
          <div className="g_item">
            <img
              src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
              className="g_image"
              alt="img4"
            />

            <div className="g_item_info">
              <ul>
                <li className="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} /> 56.8만
                </li>
                <li className="g_item_comments">
                  <FontAwesomeIcon icon={faComment} /> 6만
                </li>
              </ul>
            </div>
          </div>
          <div className="g_item">
            <img
              src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
              className="g_image"
              alt="img5"
            />

            <div className="g_item_info">
              <ul>
                <li className="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} /> 56.9만
                </li>
                <li className="g_item_comments">
                  <FontAwesomeIcon icon={faComment} /> 2만
                </li>
              </ul>
            </div>
          </div>
          <div className="g_item">
            <img
              src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
              className="g_image"
              alt="img6"
            />

            <div className="g_item_info">
              <ul>
                <li className="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} /> 59만
                </li>
                <li className="g_item_comments">
                  <FontAwesomeIcon icon={faComment} /> 2만
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
