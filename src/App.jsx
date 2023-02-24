import "./reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Routers/SideBar";
import Profile from "./Routers/Profile";
import RightMain from "./Routers/RightMain";
import Login from "./Routers/Login";
import Logindetail from "./Routers/Logindetail";
import Register from "./Routers/Register";
import ChangePassword from "./Routers/ChangePassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} >
          <Route index element={<Logindetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepw" element={<ChangePassword />} />
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
