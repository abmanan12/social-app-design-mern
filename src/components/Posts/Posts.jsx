import React, { useEffect } from 'react'

import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/PostAction'
import { useParams } from 'react-router-dom'

const Posts = ({ userPost }) => {

  const dispatch = useDispatch()
  const params = useParams()?.id
  const user = useSelector(state => state.authReducer)
  const { userExist } = user?.authData
  let { posts, loading } = useSelector(state => state.postReducer)

  useEffect(() => {

    userExist && dispatch(getTimelinePosts(userExist?._id))

  }, [])


  if (userPost === 'himself') {
    posts = posts.filter(post => post.userId === params)
  }

  return (
    <div className="Posts">
      {loading ? ('Fetching Posts ...')
        : posts.length === 0
          ? (<p style={{ textAlign: 'center' }}>No posts</p>)
          : (posts.map((post, id) => {
            return <Post data={post} id={id} key={id} />;
          }))}
    </div>
  )
}

export default Posts