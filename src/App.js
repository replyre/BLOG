import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Time from "./pages/Time";
import { FaHome, FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      alert("Successfully Logged Out");
    });
  };

  //nav bar
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <BrowserRouter basename="/blog">
      <nav>
        {windowSize.innerWidth > 450 && <span className="bracket">&lt;</span>}
        <Link to="/">
          {windowSize.innerWidth < 450 ? <FaHome className="icon" /> : "Home"}
        </Link>

        {!isAuth ? (
          <Link to="/Login">
            {windowSize.innerWidth < 450 ? (
              <FaSignInAlt className="icon" />
            ) : (
              "Login"
            )}
          </Link>
        ) : (
          <>
            <Link to="/CreatePost">
              {windowSize.innerWidth < 450 ? (
                <FaPlus style={{ margin: "0 20px" }} className="icon" />
              ) : (
                "Create Post"
              )}
            </Link>
            <Link to="/">
              <button className="signOut" onClick={logOut}>
                {windowSize.innerWidth < 450 ? (
                  <FaSignOutAlt className="icon" />
                ) : (
                  "Log Out"
                )}
              </button>
            </Link>
          </>
        )}
        {windowSize.innerWidth > 450 && <span className="bracket">/&gt;</span>}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/Login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/CreatePost" element={<CreatePost isAuth={isAuth} />} />
      </Routes>
      <Time />
    </BrowserRouter>
  );
}

export default App;
