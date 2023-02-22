import React from 'react';
import '../css/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  // const [selectedImage, setSelectedImage] = useState(null);

  // const viewPost = (e) => {
  //   setSelectedImage(e.target.src);
  // };

  // const closeModal = () => {
  //   setSelectedImage(null);
  // };

  // ------------------ //



  return (
    <div className="profile_main">
      <header>
        <div className="p_container">
          <div className="profile">
            <div className="p_image">
              <img 
                src="https://i.ibb.co/G54dpvC/tim-cook-image.png"
                alt="프로필"
                className='p_img'
              />
            </div>

            <div className="p_user_settings">
              <h1 className="p_user_name">Tim Cook</h1>

              <button className="p_btn p_edit_btn">프로필 편집</button>
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
              <p className='p_explain'>
                Apple CEO Auburn 🏀 🏈 Duke 🏀 National Parks 🏞️ “Life's most
                persistent and urgent question is, 'What are you doing for
                others?'” - MLK. You know what? I'm gay.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
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
