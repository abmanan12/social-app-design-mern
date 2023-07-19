import React from 'react'

import './ProfileSide.css'

import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'
import FollowersCard from '../FollowersCard/FollowersCard'

export default function ProfileSide() {
    return (
        <>
            <div className='ProfileSide'>
                <LogoSearch />
                <ProfileCard />
                <FollowersCard />
            </div>
        </>
    )
}
