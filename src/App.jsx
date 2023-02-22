import "./reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Routers/SideBar";
import TestProfile from "./Routers/TestProfile";
import RightMain from "./Routers/RightMain";
import Login from "./Routers/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SideBar />}>
          <Route path="/main" element={<RightMain />} />
          <Route path="/profile" element={<TestProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
