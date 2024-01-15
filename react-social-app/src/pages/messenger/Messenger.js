import React, { useContext, useEffect, useState } from 'react';
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar"
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
const Messenger = () => {

    const {user} = useContext(AuthContext);
    //console.log(user);

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    //when refresh it will automatically load all the conversation of the current user..distructruing as user
    useEffect(()=> {
        const getConversation = async() => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                console.log(res);
                setConversations(res.data);
            }catch(err) {
                console.log(err);
            }
        }
        getConversation();
    }, [user._id])

    useEffect(() => {
        const getMessages = async() => {
            try {
                const res = await axios.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            }catch(err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currentChat])

    console.log(messages);
    return (
        <>
            <Topbar/>
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder='Search For Friends' type="text" className="chatMenuInput" />
                        {
                            conversations.map((conversation) => (
                                <div onClick={ () => setCurrentChat(conversation)}>
                                    <Conversation conversation={conversation} currentUser={user} />
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                    {
                        currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {
                                        messages.map((m) => (
                                            <Message message={m} own={m.sender === user._id} />
                                        ))
                                    }
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className='chatMessageInput' placeholder='Write something' name="" id="" cols="30" rows="10"></textarea>
                                    <button className="chatSubmitButton">
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )
                    }
                        
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                    </div>
                </div>
            </div> 
        </> 
    );
};

export default Messenger;