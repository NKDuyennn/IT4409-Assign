import React, { useState, useEffect } from 'react'
import './PostForm.css'

function PostForm({ post, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
        userId: post.userId
      })
    }
  }, [post])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (post) {
      onSubmit(post.id, formData)
    } else {
      onSubmit(formData)
    }
    setFormData({ title: '', body: '', userId: 1 })
  }

  return (
    <div className="post-form-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <h2>{post ? '✏️ Chỉnh sửa Post' : '➕ Tạo Post Mới'}</h2>
        
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Tiêu đề</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề bài viết..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Nội dung</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Nhập nội dung bài viết..."
            rows="5"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {post ? '💾 Cập nhật' : '✅ Tạo mới'}
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
