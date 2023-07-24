import { Modal, useMantineTheme } from "@mantine/core";

import './ProfileModal.css'
import { UilScenery } from "@iconscout/react-unicons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../actions/UploadActions";
import { updateUser } from "../../actions/UserAction";

function ProfileModal({ modalOpened, setModalOpened, user }) {

  const theme = useMantineTheme();

  const param = useParams()?.id
  const dispatch = useDispatch()
  const { password, ...other } = user;
  const [userData, setUserData] = useState(other)
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);


  const handleChange = e => {
    setUserData(s => ({ ...s, [e.target.name]: e.target.value }))
  }


  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      e.target.name === 'profileImage' ? setProfileImage(img)
        : setCoverImage(img)
    }
  }


  const handleUpdate = async (e) => {

    e.preventDefault()
    let userProfileData = userData

    if (profileImage) {
      const data = new FormData()
      const fileName = Date.now() + profileImage?.name
      data.append("name", fileName);
      data.append("file", profileImage);
      userProfileData.profilePicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImage) {
      const data = new FormData()
      const fileName = Date.now() + coverImage?.name
      data.append("name", fileName);
      data.append("file", coverImage);
      userProfileData.coverPicture = fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(param, userProfileData));
    setModalOpened(false);

  }


  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        {/* <h3>Your info</h3> */}

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            value={userData?.firstname}
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            value={userData?.lastname}
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            value={userData?.worksAt}
            placeholder="Works at"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            value={userData?.livesin}
            placeholder="LIves in"
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            value={userData?.country}
            placeholder="Country"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            value={userData?.relationship}
            placeholder="RelationShip Status"
            onChange={handleChange}
          />
        </div>


        <div className="profile-pics">
          <span>Profile Image <input type="file" name='profileImage' onChange={handleImageChange} /></span>
          {/* <UilScenery /></span> */}

          <span>Cover Image <input type="file" name="coverImage" onChange={handleImageChange} /></span>
          {/* <UilScenery /></span> */}
        </div>

        <button className="button infoButton" onClick={handleUpdate}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
