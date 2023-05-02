import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'


const initialState = {
  users: [],
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get Multiple Tasks
export const getTasks = createAsyncThunk(
  "admin/tasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await adminService.getTasks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Multiple Tasks
export const deleteTasks = createAsyncThunk(
  "admin/tasks/delete",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await adminService.deleteTasks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Multiple Users
export const getUsers = createAsyncThunk(
  "admin/users",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await adminService.getUsers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.users = []
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.tasks = []
      })
      .addCase(deleteTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = adminSlice.actions
export default adminSlice.reducer
