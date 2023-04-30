import React from "react";
import { auth, Gprovider } from "../firebaseConfig";
import "./login.css";
import logo from "../images/user.svg";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, Gprovider)
      .then((res) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((err) => {
        alert("Action Aborted");
      });
  };
  return (
    <div className="loginPage">
      <img src={logo} className="img" />
      {/* button */}
      <button
        type="button"
        className="login-with-google-btn"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
