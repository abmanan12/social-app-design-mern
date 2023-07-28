import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './Home/Home'
import Auth from './Auth/Auth'
import Profile from './Profile/Profile'
import { useSelector } from 'react-redux'
import Chat from './Chat/Chat'

export default function Index() {

    const { userExist } = useSelector(state => state.authReducer?.authData)

    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={userExist ? <Home /> : <Auth />} />

                    <Route path='/home' element={userExist ? <Home /> : <Auth />} />

                    <Route path='/profile/:id' element={userExist ? <Profile /> : <Navigate to='/home' />} />

                    <Route path='/chat' element={userExist ? <Chat /> : <Navigate to='/home' />} />

                    <Route path="*" element={<div style={{
                        height: "calc(100vh - 32px)", display: "flex", flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <h2 style={{ marginBottom: 0 }}>ERROR: 404</h2>
                        <h4>This is not the web page you are looking for. </h4>
                    </div>} />
                </Routes>
            </BrowserRouter>

        </>
    )
}
