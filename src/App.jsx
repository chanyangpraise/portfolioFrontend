import "./reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Routers/SideBar";
import Profile from "./Routers/Profile";
import RightMain from "./Routers/RightMain";
import Login from "./Routers/Login";
import Logindetail from "./Components/Login/Logindetail";
import Register from "./Components/Login/Register";
import ChangePassword from "./Components/Login/ChangePassword";
import ForgotPassword from "./Components/Login/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} >
          <Route index element={<Logindetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepw" element={<ChangePassword />} />
          <Route path="/forgotpw" element={<ForgotPassword/>} />
        </Route>
        <Route element={<SideBar />}>
          <Route path="/main" element={<RightMain />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
