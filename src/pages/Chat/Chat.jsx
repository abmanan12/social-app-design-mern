import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import './Chat.css'
import { io } from 'socket.io-client'
import Chatbox from '../../components/Chatbox/Chatbox'
import { createChat, getUsers, searchUsers } from '../../actions/ChatActions'
import Conversation from '../../components/Conversation/Conversation'
import NavIcons from '../../components/NavIcons/NavIcons'

import '../../components/LogoSearch/LogoSearch.css'
import Logo from '../../img/logo.png'
import Search from '../../components/Search/Search'
// import { UilSearch } from '@iconscout/react-unicons'

export default function Chat() {

  const socket = useRef()
  const dispatch = useDispatch()
  const [chats, setChats] = useState([])
  const [search, setSearch] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)

  const { userExist } = useSelector(state => state.authReducer?.authData)


  const getChatUsers = async () => {

    try {

      const data = await dispatch(getUsers(userExist?._id))
      setChats(data)
      // dispatch({ type: "SAVE_USER", data: data })

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getChatUsers()
  }, [])


  // connect ro socket.io server
  useEffect(() => {

    socket.current = io('ws://localhost:8800');
    socket.current.emit('new-user-add', userExist._id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    })

  }, [userExist])


  // send message to socket server
  useEffect(() => {

    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }

  }, [sendMessage])


  // get message from socket server
  useEffect(() => {

    socket.current.on('receive-message', message => {
      setReceivedMessage(message)
    })

  }, [])


  // check online status
  const checkOnlineStatus = chat => {
    const chatMember = chat.members.find((member) => member !== userExist._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  }


  const handleSearch = async (value) => {
    try {
      if (value) {
        const searchResults = await dispatch(searchUsers(value));
        // let userData = searchResults.filter(user => user._id !== userExist._id);
        setSearch(searchResults);
      }
      else {
        setSearch([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createUserChat = async (receiverId) => {
    try {
      const data = await dispatch(createChat(userExist?._id, receiverId));
      setCurrentChat(data);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='Chat'>

      {/* Left Side */}
      <div className='Left-side-chat'>

        <div className="LogoSearch">

          <img src={Logo} alt="" />

          <div className="Search">
            <input type="search" placeholder='Find User'
              onChange={e => { handleSearch(e.target.value) }} />
          </div>
        </div>


        <div className='Chat-container'>
          <h2>Chats</h2>

          <div className='Chat-list'>

            {search?.map((search, i) => (
              <div key={i} onClick={() => { createUserChat(search._id) }}>
                <Search data={search} currentUser={userExist?._id} chat={chats} />
              </div>
            ))}

            {chats?.map((chat, i) => (
              <div key={i} onClick={() => { setCurrentChat(chat) }}>
                <Conversation data={chat} currentUser={userExist?._id}
                  online={checkOnlineStatus(chat)} />
              </div>
            ))}

          </div>

        </div>

      </div>


      {/* Right Side */}
      <div className='Right-side-chat'>

        <div style={{ width: "20rem", alignSelf: "flex-end" }}><NavIcons /></div>

        <Chatbox chat={currentChat} currentUser={userExist._id}
          setSendMessage={setSendMessage} receivedMessage={receivedMessage} />

      </div>

    </div>
  )
}
