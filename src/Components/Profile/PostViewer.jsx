import React, { useState } from 'react';
import axios from 'axios';


const PostViewer = ({ open, onClose }) => {
  const userName = "sooyaaa_"

  if (!open) return null;
  
  return (
    <div className="modalOverlay">
      <div className="modalVContainer">
        <div className="modalSettings">
          <p onClick={onClose} className="modalCloseBtn">
            X
          </p>
          <div className="modalVLeft">
            <img src="https://www.fnordware.com/superpng/pnggrad8rgb.png" alt="img1" className="view_img"/>
          </div>
          <div className="modalVRight">
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostViewer;
