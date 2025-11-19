import { useState, useEffect } from 'react'
import './App.css'
import UserTable from './components/UserTable'
import UserForm from './components/UserForm'
import SearchBar from './components/SearchBar'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5)

  // Fetch users từ API
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Create user
  const createUser = async (newUser) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      const data = await response.json()
      setUsers([data, ...users])
      setShowForm(false)
    } catch (err) {
      setError('Failed to create user')
    }
  }

  // Update user
  const updateUser = async (id, updatedUser) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
      const data = await response.json()
      setUsers(users.map(user => (user.id === id ? data : user)))
      setEditingUser(null)
      setShowForm(false)
    } catch (err) {
      setError('Failed to update user')
    }
  }

  // Delete user
  const deleteUser = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      })
      setUsers(users.filter(user => user.id !== id))
    } catch (err) {
      setError('Failed to delete user')
    }
  }

  // Filter users based on search term (by name only as per requirements)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handleEdit = (user) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setEditingUser(null)
    setShowForm(false)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>👥 User Manager</h1>
        <p>Web API Demo with JSONPlaceholder</p>
      </header>

      <div className="app-container">
        <div className="app-controls">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Close' : 'Add User'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}

        {showForm && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? updateUser : createUser}
            onCancel={handleCancelForm}
          />
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="no-results">
            <p>No results found</p>
          </div>
        ) : (
          <>
            <UserTable
              users={currentUsers}
              onEdit={handleEdit}
              onDelete={deleteUser}
            />
            
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
