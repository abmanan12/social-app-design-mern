import React, { useEffect, useState } from 'react'
import './FollowersCard.css'

import Users from '../Users/Users'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../actions/UserAction'
const FollowersCard = () => {

    const dispatch = useDispatch()
    const [persons, setPersons] = useState([]);
    const { userExist } = useSelector(state => state.authReducer?.authData)

    const fetchPersons = async () => {
        let data = await dispatch(getAllUser())
        setPersons(data);
    };

    useEffect(() => {
        fetchPersons()
    }, [])

    return (
        <div className="FollowersCard">
            <h3>People you may know</h3>

            {persons?.map((person, id) => {
                if (person._id !== userExist?._id) return <Users person={person} key={id} />
            })}
        </div>
    )
}

export default FollowersCard