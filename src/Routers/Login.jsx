import "./Login.css";
import { Outlet } from "react-router-dom";
import phones from "../Components/Login/loginimg/phones.png";
import picture1 from "../Components/Login/loginimg/photo-1.png";
import picture2 from "../Components/Login/loginimg/photo-2.png";
import picture3 from "../Components/Login/loginimg/photo-3.png";
import picture4 from "../Components/Login/loginimg/photo-4.png";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/loginSlice";

function Login() {
  const dispatch = useDispatch();
  dispatch(
    login({
      isLogin: false,
      userid: "",
      nick: "",
      email: "",
    })
  );

  return (
    <div className="login_wrap">
      <div className="loginpage">
        <div id="content-container">
          {/*Phone's pictures section*/}
          <div className="phones">
            <img src={phones} alt="pictures on phone" className="phone-image" />
            <div className="display-phone">
              <img className="picture" src={picture1} alt="#" />
              <img className="picture" src={picture2} alt="#" />
              <img className="picture" src={picture3} alt="#" />
              <img className="picture" src={picture4} alt="#" />
            </div>
          </div>
          {/*User's log in section*/}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Login;
