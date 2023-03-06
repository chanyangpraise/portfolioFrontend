import { useSelector } from "react-redux";
import "./SideProfile.css";

function SideProfile() {
  const email = useSelector((store) => store.loginState.email);
  const uimg = useSelector((store) => store.loginState.uimg);
  return (
    <div className="sidebarProfile">
      <img className="sidebarProfile_img" src={uimg} alt="profile"></img>
      <span className="sidebarProfile_user_name">{email}</span>
    </div>
  );
}

export default SideProfile;
