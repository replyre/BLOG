import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import "./CreatePost.css";
import { FaEdit } from "react-icons/fa";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();
  // console.log(auth?.currentUser.photoURL);
  const postCollectionRef = collection(db, "posts");
  React.useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        img: auth.currentUser.photoURL,
      },
    });
    navigate("/");
  };
  return (
    <div className="createPage">
      <div className="container">
        <h1>
          Create Your Post
          <FaEdit />
        </h1>
        <div className="form">
          <label>
            Title:
            <input
              placeholder="Enter the Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label>
            Post:
            <textarea
              placeholder="Type your post here..."
              onChange={(e) => {
                setPostText(e.target.value);
              }}
            />
          </label>
          <button type="submit" onClick={createPost}>
            Click to Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
