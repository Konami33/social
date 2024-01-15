import React, { useEffect, useState } from 'react';
import "./conversation.css"
import axios from 'axios';
const Conversation = ({conversation, currentUser}) => {

    console.log("this is from conversation");
    //const friendId = conversations.members.find(fId => fId !== currentUser._id)
    // console.log("this is from conversation");
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
    
        const getUser = async () => {
          try {
            const res = await axios("/users?userId=" + friendId);
            setUser(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className='conversation'>
            <img 
                src={
                    user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                } 
                alt="" className="conversationImg" />
            <span className="conversationName">{user?.username}</span>
        </div>
    );
};

export default Conversation;