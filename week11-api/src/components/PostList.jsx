import React from 'react'
import PostItem from './PostItem'
import './PostList.css'

function PostList({ posts, onEdit, onDelete }) {
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default PostList
