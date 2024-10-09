import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { getDocs, collection, deleteDoc ,doc} from "@firebase/firestore";

function Home() {
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
        const postDoc = doc(db,"posts",id)
        await deleteDoc(postDoc)
    }
    return (
        <div className="homePage">
            {postLists.map((post) => (
                <div className="post" key={post.id}>
                    <div className="postHeader">
                    <div className="title">
                        <h1>{post.title}</h1></div>
                    </div>
                    <div className="deletePost">
                        {isAuth && post.author.id == updateCurrentUser.uui && <button onClick={() =>{
                            deletePost(post.id);
                        }}>&#128465;</button>
                    </div>
                    <div className="postTextContainer">{post.postText}</div>
                </div>
            ))}
        </div>
    );
}

export default Home;
//                    <h3>@{post.author.name}</h3>
