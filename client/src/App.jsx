import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import "./app.css"
import ProfilePage from "./pages/ProfilePage";
import TweetPage from "./pages/TweetPage";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const isAuth = useSelector(state => state.token);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={isAuth ? <HomePage /> : <Login />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/profile/:user_id" element={<ProfilePage />} />
          <Route path="/tweet/:tweet_id" element={<TweetPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;