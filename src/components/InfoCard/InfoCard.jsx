import React, { useEffect, useState } from "react";

import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../actions/UserAction";
import { logout } from "../../actions/AuthActions";

const InfoCard = () => {

  const dispatch = useDispatch()
  const profileUserId = useParams()?.id
  const [profileUser, setProfileUser] = useState({})
  const { userExist } = useSelector(state => state.authReducer?.authData)

  const [modalOpened, setModalOpened] = useState(false);


  const fetchProfileData = async () => {
    if (userExist?._id === profileUserId) {
      setProfileUser(userExist)
    }
    else {
      let data = await dispatch(getUser(profileUserId))
      setProfileUser(data)
    }
  }


  useEffect(() => {
    fetchProfileData()
  }, [userExist])


  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>

        {userExist?._id === profileUserId ?
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              user={userExist}
            />
          </div> : ''}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span style={{ fontSize: '14px' }}>{profileUser?.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span style={{ fontSize: '14px' }}>{profileUser?.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span style={{ fontSize: '14px' }}>{profileUser?.worksAt}</span>
      </div>

      {userExist?._id === profileUserId ?
        <button className="button logout-button" onClick={handleLogOut}>Logout</button>
        : ''}
    </div>
  );
};

export default InfoCard;
