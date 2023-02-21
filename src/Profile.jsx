import React from 'react';
import './css/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  return (
    <div className="profile_main">
      <header>
        <div className="container">
          <div className="profile">
            <div className="p_image">
              <img
                src="https://i.ibb.co/G54dpvC/tim-cook-image.png"
                alt="프로필"
              />
            </div>

            <div className="p_user_settings">
              <h1 className="p_user_name">Tim Cook</h1>

              <button className="btn p_edit_btn">프로필 편집</button>
            </div>
            <div className="p_stats">
              <ul>
                <li>
                  게시물 <span class="p_stat">164</span>
                </li>
                <li>
                  팔로워 <span class="p_stat">188</span>
                </li>
                <li>
                  팔로우 <span class="p_stat">206</span>
                </li>
              </ul>
            </div>
            <div className="p_bio">
              <p>
                Apple CEO Auburn 🏀 🏈 Duke 🏀 National Parks 🏞️ “Life's most
                persistent and urgent question is, 'What are you doing for
                others?'” - MLK. he/him
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div class="gallery">
          <div class="g_item">
            <img
              src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
              class="g_image"
              alt=""
            />

            <div class="g_item_info">
              <ul>
                <li class="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} /> 56
                </li>
                <li class="g_item_comments">
                  <FontAwesomeIcon icon={faComment} /> 2
                </li>
              </ul>
            </div>
          </div>
          <div class="g_item">
            <img
              src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
              class="g_image"
              alt=""
            />

            <div class="g_item_info">
              <ul>
                <li class="g_item_likes">
                  <FontAwesomeIcon icon={faHeart} /> 89
                </li>
                <li class="g_item_comments">
                  <FontAwesomeIcon icon={faComment} /> 5
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
