import React from 'react'
import './PostItem.css'

function PostItem({ post, onEdit, onDelete }) {
  return (
    <div className="post-item">
      <div className="post-header">
        <span className="post-id">ID: {post.id}</span>
        <span className="post-user">User: {post.userId}</span>
      </div>
      
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      
      <div className="post-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(post)}
        >
          ✏️ Sửa
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
              onDelete(post.id)
            }
          }}
        >
          🗑️ Xóa
        </button>
      </div>
    </div>
  )
}

export default PostItem
