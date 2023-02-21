import React from 'react';
import './css/profile.css';

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
        <div className="gallery">
          <div className="gallery_item">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
