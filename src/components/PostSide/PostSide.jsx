import React from 'react'

import './PostSide.css'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'

const PostSide = ({ userPost }) => {
  
  return (
    <div className="PostSide">
      <PostShare />
      <Posts userPost={userPost} />
    </div>
  )
}

export default PostSide