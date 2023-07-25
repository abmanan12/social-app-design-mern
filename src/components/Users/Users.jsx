import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/UserAction';

export default function Users({ person }) {

    const dispatch = useDispatch()
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { userExist } = useSelector(state => state.authReducer?.authData)

    let img = serverPublic + person?.profilePicture
    let defaultImg = serverPublic + "defaultProfile.png"

    let checkFollow = userExist.followers.includes(person._id) ||
        userExist.following.includes(person._id)

    const [following, setFollowing] = useState(checkFollow)

    const handleFollow = () => {

        following
            ? dispatch(unfollowUser(person._id, userExist))
            : dispatch(followUser(person._id, userExist));

        setFollowing((prev) => !prev);

    }

    return (
        <div className="follower">
            <div>
                <img src={person?.profilePicture ? img : defaultImg} alt="" className='followerImage' />
                <div className="name">
                    <span>{person?.firstname + ' ' + person?.lastname}</span>
                    <span style={{ fontSize: '12px' }}>@{person?.lastname.toLowerCase()}</span>
                </div>
            </div>

            <button className={following ? "button fc-button UnfollowButton" : "button fc-button"}
                onClick={handleFollow}>{following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    )
}
