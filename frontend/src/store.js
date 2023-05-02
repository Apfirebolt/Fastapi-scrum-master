import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import taskReducer from './features/tasks/taskSlice'
import adminReducer from './features/admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    taskData: taskReducer,
    adminData: adminReducer
  },
})
