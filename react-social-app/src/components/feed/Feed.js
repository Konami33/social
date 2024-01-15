import React, { useContext, useEffect, useState } from 'react';
import "./feed.css";
import Share from '../share/Share';
import Post from '../post/Post';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
//import { Posts } from '../../dummyData';
const Feed = ({username}) => {

    //showing the post who logged in..
    //to do that we have to receive the props from the context. its gonna be AuthContext
    const {user} = useContext(AuthContext);

    //fetching posts from database
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async() =>{
            //console.log(username);
            const res = username
            ? await axios.get("/posts/profile/" + username)
            : await axios.get("/posts/timeline/" + user._id);
            setPosts(res.data.sort((p1,p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        }
        fetchPosts();
    },[username, user._id]);
    return (
        <div className='feed'>
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {
                    posts.map(
                        post => <Post
                        key={post._id} post={post}
                    ></Post> )
                }
                
            </div>
        </div>
    );
};

export default Feed;