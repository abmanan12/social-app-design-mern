import React from "react";

import "./ProfileCard.css";

import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const ProfileCard = ({ location }) => {

  const user = useSelector(state => state.authReducer)
  const { userExist } = user?.authData
  const posts = useSelector((state) => state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (

    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
          userExist?.coverPicture
            ? serverPublic + userExist?.coverPicture
            : serverPublic + "defaultCover.jpg"
        } alt="CoverImage" />
        <img
          src={
            userExist?.profilePicture
              ? serverPublic + userExist?.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>

      <div className="ProfileName">
        <span>{userExist?.firstname} {userExist?.lastname}</span>
        <span style={{ fontSize: '14px' }}>{userExist?.worksAt ?
          userExist?.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{userExist?.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{userExist?.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post) => post.userId === userExist?._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? "" : <span><Link to={`/profile/${userExist._id}`}
        style={{ textDecoration: "none", color: "inherit" }}>My Profile</Link></span>}

    </div>

  );
};

export default ProfileCard;
