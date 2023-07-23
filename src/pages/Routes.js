import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './Home/Home'
import Auth from './Auth/Auth'
import { useSelector } from 'react-redux'

export default function Index() {

    const { userExist } = useSelector(state => state.authReducer.authData)

    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={userExist ? <Home /> : <Auth />} />

                    <Route path='/home' element={<Home />} />

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
