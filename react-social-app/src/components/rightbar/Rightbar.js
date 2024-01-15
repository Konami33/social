import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css";
import { Users } from '../../dummyData';
import Online from '../online/Online';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';


const Rightbar = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    //console.log(user);
    const [friends, setFriends] = useState([]);
    const {user:currentUser, dispatch} = useContext(AuthContext); //jar account take nilam

    //set followings
    const [followed, setFollowed] = useState(
        currentUser.following.includes(user?.id)
    );

    // useEffect(() => {
    //     setFollowed(currentUser.following.includes(user?._id))
    // },[currentUser, user._id]);
    //dependency error

    useEffect(() => {
        const getFriends = async() => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
                console.log(friendList);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);
    //dependency error

    // const handleClick = async(req, res) => {
    //     console.log("clicked");
    //     try {
    //         if(followed) {
    //             await axios.put("/users/" + user._id + "/unfollow", {userId:currentUser._id});
    //         }
    //         else {
    //             await axios.put("/users/" + user._id + "/unfollow",{userId:currentUser._id});
    //         }
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }
    //from github
    const handleClick = async () => {
        try {
          if (followed) {
            await axios.put(`/users/${user._id}/unfollow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
          } else {
            await axios.put(`/users/${user._id}/follow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "FOLLOW", payload: user._id });
          }
          setFollowed(!followed);
        } catch (err) {
            console.log(err);
        }
      };


    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img
                        className="birthdayImg"
                        src="assets/gift.png" alt="Not found"  
                    />
                    <span className="birthdayText">
                        <b>Yasin</b> and <b>three other friends</b> have birthday today.
                    </span>
            </div>
            <img src="assets/ad.png" alt="" className="rightbarAd" />
            <h4 className="rightbarTitle">
                    Online Friends
            </h4>
            <ul className="rightbarFriendList">
                    {Users.map(user => <Online
                        key={user.id}
                        user={user}
                    ></Online>)}
            </ul>
        </>
        )
    }
    const ProfileRightBar = () => {
        //console.log(user.username);
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="righbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove/> : <Add/>}
                </button>
            )}

                <h4 className="rightbarTitle">
                    User Information
                </h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInforKey">
                            City : 
                        </span>
                        <span className="rightbarInfoValue">
                            {user.city}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInforKey">
                            From :  
                        </span>
                        <span className="rightbarInfoValue">
                            {user.from}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInforKey">
                            Relationship : 
                        </span>
                        <span className="rightbarInfoValue">
                            {
                                user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" :" Still Searching"
                            }
                        </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">
                    User Friends
                </h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} style={{textDecoration: "none"}}>
                            <div className="rightbarFollowing">
                            <img 
                                src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" 
                            />
                            <span className="rightbarFollowingName">
                                {friend.username}
                            </span>
                        </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {user? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    );
};
export default Rightbar;