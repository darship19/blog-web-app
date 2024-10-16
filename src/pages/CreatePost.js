import React, { useEffect, useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import "../CreatePost.css"; // Make sure to import your CSS file

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const postCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

    const createPost = async () => {
        setLoading(true); // Set loading to true

        try {
            // Add the post to Firestore
            await addDoc(postCollectionRef, {
                title,
                postText,
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
            });
            navigate("/");
        } catch (error) {
            console.error("Error creating post:", error);
            // Handle the error (e.g., show an error message)
        } finally {
            setLoading(false); // Reset loading state
            setTitle(""); // Clear title input
            setPostText(""); // Clear post text input
        }
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate]); // Add dependencies to useEffect

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="Enter your title here..."
                        value={title} // Controlled component
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                        className="inputField"
                    />
                </div>
                <div className="inputGp">
                    <label>Post:</label>
                    <textarea
                        placeholder="Write your post here..."
                        value={postText} // Controlled component
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                        className="textareaField"
                    />
                </div>
                <button onClick={createPost} disabled={loading} className="submitButton">
                    {loading ? "Submitting..." : "Submit Post"}
                </button>
            </div>
        </div>
    );
}

export default CreatePost;
