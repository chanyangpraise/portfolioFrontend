import React, { useRef } from 'react';

function ProfileModal(props) {
  const { open, onClose } = props;
  const fileInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = fileInput.current.files[0];
    console.log(file);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal_content">
        <form onSubmit={handleSubmit}>
          <input type="file" ref={fileInput} />
          <button type="submit">업로드</button>
        </form>
        <button className="modal_close_btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;