import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: [],
  project: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isImageUploading: false,
  message: "",
};

export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectService.createProject(projectData, token);
    } catch (error) {
      const message =
        (error.response?.data?.detail) ||
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectService.getProjects(token);
    } catch (error) {
      const message =
        (error.response?.data?.detail) ||
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProject = createAsyncThunk(
  "projects/get",
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectService.getProject(projectId, token);
    } catch (error) {
      const message =
        (error.response?.data?.detail) ||
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectService.updateProject(projectData, token);
    } catch (error) {
      const message =
        (error.response?.data?.detail) ||
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectService.deleteProject(projectId, token);
    } catch (error) {
      const message =
        (error.response?.data?.detail) ||
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadProjectImages = createAsyncThunk(
  "projects/uploadImages",
  async ({ projectId, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectService.uploadProjectImages({ projectId, formData }, token);
    } catch (error) {
      const message =
        (error.response?.data?.detail) ||
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProjectImage = createAsyncThunk(
  "projects/deleteImage",
  async ({ projectId, imageId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectService.deleteProjectImage({ projectId, imageId }, token);
    } catch (error) {
      const message =
        (error.response?.data?.detail) ||
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    reset: () => initialState,
    resetVariables: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isImageUploading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Projects
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Single Project
      .addCase(getProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.project = {
          ...state.project,
          ...action.payload,
        };
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Upload Images
      .addCase(uploadProjectImages.pending, (state) => {
        state.isImageUploading = true;
      })
      .addCase(uploadProjectImages.fulfilled, (state, action) => {
        state.isImageUploading = false;
        if (state.project && state.project.images) {
          state.project.images.push(...action.payload);
        } else if (state.project) {
          state.project.images = action.payload;
        }
      })
      .addCase(uploadProjectImages.rejected, (state, action) => {
        state.isImageUploading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Image
      .addCase(deleteProjectImage.fulfilled, (state, action) => {
        if (state.project && state.project.images) {
          state.project.images = state.project.images.filter(
            (img) => img.id !== action.payload.imageId
          );
        }
      })
      .addCase(deleteProjectImage.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = projectSlice.actions;
export default projectSlice.reducer;