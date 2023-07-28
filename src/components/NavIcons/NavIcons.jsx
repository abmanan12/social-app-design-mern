import React from 'react'

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";

import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

export default function NavIcons() {
    return (
        <>
            <div className="navIcons">
                <Link to='/home'><img src={Home} alt="home_icon" /></Link>
                <UilSetting />
                <img src={Noti} alt="" />
                <Link to='/chat'><img src={Comment} alt="" /></Link>
            </div>
        </>
    )
}
