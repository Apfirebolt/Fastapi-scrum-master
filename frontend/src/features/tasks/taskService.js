import axios from 'axios'

const API_URL = 'http://localhost:8000/task/'

// Create new task
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, taskData, config)

  return response.data
}

// Get user tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

const taskService = {
  createTask,
  getTasks,
}

export default taskService
