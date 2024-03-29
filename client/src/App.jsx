import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import SignUp from "./pages/SignUp";
import TweetPage from "./pages/TweetPage";

const App = () => {
  const { token } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={token ? <HomePage /> : <Login />} />
          <Route
            path="/home"
            element={token ? <HomePage /> : <Navigate to="/" />}
          />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/profile/:user_id" element={<ProfilePage />} />
          <Route path="/tweet/:tweet_id" element={<TweetPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
