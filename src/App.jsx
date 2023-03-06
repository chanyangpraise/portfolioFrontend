import "./reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Routers/SideBar";
import Profile from "./Routers/Profile";
import Login from "./Routers/Login";
import Logindetail from "./Components/Login/Logindetail";
import Register from "./Components/Login/Register";
import ChangePassword from "./Components/Login/ChangePassword";
import ForgotPassword from "./Components/Login/ForgotPassword";
import VerifyEmail from "./Components/Login/VerifyEmail";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store/store";
import Main from "./Routers/Main";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}>
              <Route index element={<Logindetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/changepw" element={<ChangePassword />} />
              <Route path="/forgotpw" element={<ForgotPassword />} />
              <Route path="/verifyemail" element={<VerifyEmail />} />"
            </Route>
            <Route element={<SideBar />}>
              <Route path="/main" element={<Main />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
