import React, { useContext, useRef, useState } from 'react';
import "./share.css";
import {PermMedia, Label, Room, EmojiEmotions} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const [file, setFile] = useState(null)

    const desc = useRef();

    const submitHandler = async(e) => {
        console.log("Share button clicked");
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };

        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            
            //file upload api call
            try {
                await axios.post("/upload", data);
            } catch(err) {
                console.log(err);
            }
        }

        //post upload api call
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
        
    }
    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        className="shareProfileImg" 
                        src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="not found" 
                    />
                    <input 
                        type="text"
                        placeholder={"What's in your mind " + user.username + "?"}
                        className="shareInput" 
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                
                {/* eikhane extra jinish dise  */}

                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato'className='shareIcon'/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{display: "none"}} 
                                type="file" 
                                id='file' 
                                accept='.png,.jpeg,.jpg' 
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue'className='shareIcon'/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green'className='shareIcon'/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod'className='shareIcon'/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>
                        Share
                    </button>
                </form>  
            </div>
        </div>
    );
};

export default Share;