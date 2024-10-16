import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { getDocs, collection, deleteDoc, doc } from "@firebase/firestore";
import { auth } from "../firebase-config";
import "../Home.css"; // Make sure to import your CSS file

function Home({ isAuth }) {
    const [postLists, setPostList] = useState([]); // Default to an empty array
    const postCollectionRef = collection(db, "posts"); // Reference to the 'posts' collection

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // Set state with the mapped post data
        };
        getPosts();
    }, []); // Empty dependency array to run only once on mount

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id)); // Update the state to remove the deleted post
    };

    return (
        <div className="homePage">
            <h1 className="pageTitle">Posts</h1>
            {postLists.map((post) => {
                return (
                    <div key={post.id} className="post">
                        <div className="postHeader">
                            <div className="title">
                                <h2>{post.title}</h2>
                            </div>
                            <div className="deletePost">
                                {isAuth && post.author.id === auth.currentUser.uid && (
                                    <button
                                        className="deleteButton"
                                        onClick={() => {
                                            deletePost(post.id);
                                        }}
                                    >
                                        &#128465;
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="postTextContainer">{post.postText}</div>
                        <h3 className="author">@{post.author.name}</h3>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
