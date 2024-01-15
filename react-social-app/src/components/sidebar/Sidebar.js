import React from 'react';
import "./sidebar.css"
import {RssFeed, Chat, Groups, Bookmark, Help, Work, EventAvailable} from "@mui/icons-material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Users } from '../../dummyData';
import CloseFriend from '../closeFriend/CloseFriend';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarListIcon'></RssFeed>
                        <span className="sidebarListItemText">
                            Feed
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className='sidebarListIcon'></Chat>
                        <span className="sidebarListItemText">
                            Chats
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <OndemandVideoIcon className='sidebarListIcon'></OndemandVideoIcon>
                        <span className="sidebarListItemText">
                            Videos
                        </span>
                    </li>
                    <li className="sidebarListItem">
                       <Groups className='sidebarListIcon'></Groups>
                        <span className="sidebarListItemText">
                            Groups
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className='sidebarListIcon'></Bookmark>
                        <span className="sidebarListItemText">
                            BookMarks
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Help className='sidebarListIcon'></Help>
                        <span className="sidebarListItemText">
                            Questions
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Work className='sidebarListIcon'></Work>
                        <span className="sidebarListItemText">
                            Jobs
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <EventAvailable className='sidebarListIcon'></EventAvailable>
                        <span className="sidebarListItemText">
                            Events
                        </span>
                    </li>
                </ul> 
                <button className="sidebarButton">
                    Show More
                </button>
                <hr className='sidebarHr' />
                <ul className="sidebarFriendList">
                    {Users.map(user => <CloseFriend
                        key={user.id}
                        user={user}
                    ></CloseFriend>)}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;