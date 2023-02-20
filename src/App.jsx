import "./reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Routers/SideBar";
import TestProfile from "./Routers/TestProfile";
import RightMain from "./Routers/RightMain";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SideBar />}>
          <Route path="/" element={<RightMain />} />
          <Route path="/profile" element={<TestProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
