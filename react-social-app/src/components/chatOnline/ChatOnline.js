import React from 'react';
import "./chatOnline.css"
const ChatOnline = () => {
    return (
        <div ChatOnline>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className='chatOnlineImg' src="assets/person/1.jpeg" alt="" />
                    <div className="chatOnlineBadge">
                    </div>
                </div>
                <span className="chatOnlineName">
                    John
                </span>
            </div>
        </div>
    );
};

export default ChatOnline;