import React from 'react';
import Topbar from '../components/topbar/Topbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            {/* <Topbar></Topbar> */}
            {/*         */}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;