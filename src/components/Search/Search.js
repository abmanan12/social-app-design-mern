import React from 'react'

export default function Search({ data, currentUser, chat }) {

    if (data?._id === currentUser) {
        return null
    }

    return (
        <>

            <div className='follower conversation'>
                <div>

                    <img
                        src={data?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + data.profilePicture
                            : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="Profile"
                        className="followerImage" style={{ width: "30px", height: "30px" }}
                    />

                    <div className="name" style={{ fontSize: '0.7rem' }}>
                        <span>{data?.firstname} {data?.lastname}</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: "85%", border: "0.8px solid #ececec" }} />

        </>
    )
}
