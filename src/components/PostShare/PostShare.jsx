import React, { useState, useRef } from "react";

import "./PostShare.css";
import { useDispatch, useSelector } from "react-redux";

import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { uploadImage, uploadPost } from "../../actions/UploadActions";


const PostShare = () => {

  const desc = useRef();
  const imageRef = useRef();
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { userExist } = useSelector(state => state.authReducer?.authData)
  const uploading = useSelector(state => state.postReducer.uploading)

  const onImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {

    e.preventDefault()

    const newPost = {
      userId: userExist?._id,
      description: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    dispatch(uploadPost(newPost))
    resetShare()

  }

  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };


  return (
    <div className="PostShare">

      <img src={
        userExist?.profilePicture
          ? serverPublic + userExist?.profilePicture
          : serverPublic + "defaultProfile.png"}
        alt="ProfileImage" />

      <div>

        <input type="text" ref={desc} placeholder="What's happening" required />

        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}>
            <UilScenery />Photo</div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />Video</div>{" "}

          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />Location</div>{" "}

          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />Shedule</div>

          <button className="button ps-button" onClick={handleUpload} disabled={uploading}>
            {uploading ? "uploading..." : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>

        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>

        )}

      </div>
    </div>
  );
};

export default PostShare;
