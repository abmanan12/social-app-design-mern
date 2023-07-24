import React, { useState } from 'react'

import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../actions/PostAction'

const Post = ({ data }) => {

  const dispatch = useDispatch()
  const { userExist } = useSelector(state => state.authReducer.authData)

  const [liked, setLiked] = useState(data.likes?.includes(userExist?._id))
  const [likesLength, setLikesLength] = useState(data.likes?.length)

  const handleLike = () => {
    dispatch(likePost(data._id, userExist._id))
    setLiked((prev) => !prev);
    liked ? setLikesLength((prev) => prev - 1) : setLikesLength((prev) => prev + 1)
  }

  return (
    <div className="Post">
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''} alt="" />

      <div className="postReact">
        <img src={liked ? Heart : NotLike} style={{ cursor: 'pointer' }} onClick={handleLike} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likesLength} likes</span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.description}</span>
      </div>
    </div>
  )
}

export default Post