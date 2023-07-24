import React from 'react'

export default function Users({ person }) {

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    let img = serverPublic + person?.profilePicture
    let defaultImg = serverPublic + "defaultProfile.png"

    return (
        <div className="follower">
            <div>
                <img src={person?.profilePicture ? img : defaultImg} alt="" className='followerImage' />
                <div className="name">
                    <span>{person?.firstname + ' ' + person?.lastname}</span>
                    <span style={{ fontSize: '12px' }}>@{person?.lastname.toLowerCase()}</span>
                </div>
            </div>
            <button className='button fc-button'>
                Follow
            </button>
        </div>
    )
}
