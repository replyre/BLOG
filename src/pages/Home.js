import React, { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import "./Home.css";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const Home = ({ isAuth }) => {
  const [postLists, SetPostList] = useState([]);
  const [postIndex, setPostIndex] = useState(0);
  const [check, setCheck] = useState(true);
  const [deleted, setDelete] = useState(false);
  const postCollectionRef = collection(db, "posts");
  // const [count, setCount] = useState(0);
  const handleButton = (i) => {
    setCheck((prevCheck) => !prevCheck);
    postIndex === i
      ? check
        ? setPostIndex(i)
        : setPostIndex(-1)
      : setPostIndex(i);
  };

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setDelete((prev) => !prev);
  };

  useEffect(() => {
    try {
      const getPosts = async () => {
        const data = await getDocs(postCollectionRef);
        SetPostList(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      };
      getPosts();
    } catch (err) {
      alert("Data Unavailable, try again later.");
      console.log(err);
    }

    // setCount((prevCount) => prevCount + 1);
  }, [deleted]);

  // console.log(count);

  return (
    <div className="homePage">
      {/* {console.log(postLists)} */}
      {postLists.map((post, index) => {
        return (
          <div className="post">
            <div className="post-head">
              <img src={post.author.img} alt="pic" />
              <h1>
                {post.title}
                <FaPlus
                  className={postIndex === index ? "mul" : "plus"}
                  onClick={() => handleButton(index)}
                />
              </h1>
            </div>

            <div
              className={postIndex === index ? "post-body-anime" : "post-body"}
            >
              {post.postText}
            </div>

            {
              <h3 className="post_name">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    className="delete"
                    onClick={() => deletePost(post.id)}
                  >
                    <FaTrashAlt />
                  </button>
                )}
                <div className="text"> @{post.author.name}</div>
              </h3>
            }
          </div>
        );
      })}
    </div>
  );
};

export default Home;
