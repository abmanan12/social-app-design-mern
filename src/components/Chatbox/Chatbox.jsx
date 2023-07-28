import React, { useEffect, useRef, useState } from 'react'

import './Chatbox.css';
import { getUser } from '../../actions/UserAction';
import { useDispatch } from 'react-redux';
import { addMessage, getMessages } from '../../actions/ChatActions';

import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

export default function Chatbox({ chat, currentUser, setSendMessage, receivedMessage }) {

  const scroll = useRef();
  const imageRef = useRef();
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([])
  const [userData, setUserData] = useState(null)
  const [newMessage, setNewMessage] = useState('');


  // get users from server
  useEffect(() => {

    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        let data = await dispatch(getUser(userId))
        setUserData(data);

      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();

  }, [chat, currentUser]);


  // get messages from server
  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const data = await dispatch(getMessages(chat._id));
        setMessages(data);

      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();

  }, [chat]);


  // scroll effect
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])


  // text from input
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }


  // send message
  const handleSend = async (e) => {

    e.preventDefault();

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id
      // createdAt: new Date().getTime(),
      // image: imageRef.current?.files[0]
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    try {

      // send message to the server
      const data = await dispatch(addMessage(message))
      setMessages([...messages, data])
      setNewMessage('')

    } catch (error) {
      console.log(error);
    }

  }


  // receive message from server
  useEffect(() => {

    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage])
    }

  }, [receivedMessage])

  return (
    <>

      <div className="ChatBox-container">

        {chat ? (
          <>

            {/* chat header */}
            <div className="chat-header">

              <div className="follower">
                <div>
                  <img
                    src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="Profile"
                    className="followerImage" style={{ width: "50px", height: "50px" }}
                  />

                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>

              <hr
                style={{
                  width: "98%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>

            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message, i) => (
                <>
                  <div ref={scroll} key={i} className=
                    {message.senderId === currentUser
                      ? "message own" : "message"}>
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>

          </>)

          : (<span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>)
        }

      </div>

    </>
  )
}
