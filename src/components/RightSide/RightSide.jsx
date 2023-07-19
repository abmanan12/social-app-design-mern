import React, { useState } from "react";

import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
// import ShareModal from "../ShareModal/ShareModal";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";

import { UilSetting } from "@iconscout/react-unicons";

const RightSide = () => {

  // const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      <div className="navIcons">
        <img src={Home} alt="" />
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div>

      <TrendCard />

      {/* onClick={() => setModalOpened(true)} */}
      <button className="button r-button">
        Share
      </button>
      {/* <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} /> */}

    </div>
  );
};

export default RightSide;
