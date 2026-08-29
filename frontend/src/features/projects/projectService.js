import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/project/";

// Create new project
const createProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, projectData, config);
  return response.data;
};

// Get user projects
const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single Project
const getProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + projectId, config);
  return response.data;
};

// Update Project
const updateProject = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + data.id, data, config);
  return response.data;
};

// Delete single Project
const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + projectId, config);
  return response.data;
};

// Upload Project Images
const uploadProjectImages = async ({ projectId, formData }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(`${API_URL}${projectId}/images`, formData, config);
  return response.data;
};

// Delete Project Image
const deleteProjectImage = async ({ projectId, imageId }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${projectId}/images/${imageId}`, config);
  return { imageId, responseData: response.data };
};

const projectService = {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjects,
  uploadProjectImages,
  deleteProjectImage,
};

export default projectService;