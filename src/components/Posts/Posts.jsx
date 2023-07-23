import React, { useEffect } from 'react'

import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/PostAction'

const Posts = () => {

  const dispatch = useDispatch()
  const { userExist } = useSelector(state => state.authReducer.authData)
  const { posts, uploading } = useSelector(state => state.postReducer)

  useEffect(() => {

    userExist && dispatch(getTimelinePosts(userExist?._id))

  }, [])

  console.log(posts);

  return (
    <div className="Posts">
      {uploading ? 'Fetching Posts ...'
        : posts.map((post, id) => {
          return <Post data={post} id={id} />
        })}
    </div>
  )
}

export default Posts