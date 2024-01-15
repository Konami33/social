import React, { useContext } from 'react';
import "./topbar.css";
import { Person, Search, Chat} from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
const Topbar = () => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link style={{textDecoration: "none"}}  to={"/"}>
                    <span className='logo'>Social</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon'></Search>
                    <input placeholder='Search for friend, post or any video' className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className='topbarLink'>Homepage</span>
                    <span className='topbarLink'>Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person></Person>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat></Chat>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon/>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={
                        user.profilePicture 
                        ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImage" />
                </Link>
            </div>
        </div>
    );
};

export default Topbar;