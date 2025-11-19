import React from 'react'
import './UserItem.css'

function UserItem({ user, onEdit, onDelete }) {
  return (
    <div className="user-item">
      <div className="user-header">
        <div className="user-id">#{user.id}</div>
        <div className="user-username">@{user.username}</div>
      </div>
      
      <h3 className="user-name">{user.name}</h3>
      
      <div className="user-details">
        <div className="user-detail">
          <span className="label">Email:</span>
          <span className="value">{user.email}</span>
        </div>
        <div className="user-detail">
          <span className="label">Phone:</span>
          <span className="value">{user.phone}</span>
        </div>
        <div className="user-detail">
          <span className="label">Website:</span>
          <span className="value">{user.website}</span>
        </div>
        <div className="user-detail">
          <span className="label">City:</span>
          <span className="value">{user.address?.city || 'N/A'}</span>
        </div>
        <div className="user-detail">
          <span className="label">Company:</span>
          <span className="value">{user.company?.name || 'N/A'}</span>
        </div>
      </div>
      
      <div className="user-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm(`Delete ${user.name}?`)) {
              onDelete(user.id)
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserItem
