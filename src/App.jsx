import "./reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Routers/SideBar";
import Profile from "./Routers/Profile";
import RightMain from "./Routers/RightMain";
import Login from "./Routers/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SideBar />}>
          <Route path="/main" element={<RightMain />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
