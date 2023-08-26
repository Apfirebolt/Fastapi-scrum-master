import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import {
  updateProject,
  getProject,
  deleteProject,
  resetVariables,
} from "../features/projects/projectSlice";

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  

  useEffect(() => {
    dispatch(getProject(params.projectId));
  }, [dispatch, params.projectId]);

  const { project, isError, isSuccess, message } = useSelector(
    (state) => state.projectData
  );

  useEffect(() => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    if (isError) {
      toast.error(message, toastOptions);
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage, toastOptions);
      dispatch(resetVariables());
      navigate("/projects");
    }
  }, [
    dispatch,
    isError,
    isSuccess,
    navigate,
    message,
    toastMessage,
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    reset({
      title: project.title,
      description: project.description,
    });
  }, [project, reset]);

  const deleteProjectUtil = (e) => {
    e.preventDefault();
    setToastMessage("Project successfully deleted!");
    dispatch(deleteProject(params.projectId));
  };

  const updateProjectUtil = (data) => {
    setToastMessage("Project successfully updated!");
    data.id = project.id;
    dispatch(updateProject(data));
  };

  return (
    <form
      onSubmit={handleSubmit((data) => updateProjectUtil(data))}
      className="md:w-1/2 sm:w-3/4 mx-auto my-3"
    >
      <p className="text-center text-2xl my-3 text-red-700">PROJECT DETAIL</p>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Project Title"
          {...register("title", { required: true })}
        />
        {errors.title && <p className="text-red-500">Title is required.</p>}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          placeholder="Project Description"
          rows="10"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500">Description is required.</p>
        )}
      </div>
      
      <div>
        <input
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
          value="Update Project"
        />
        <button
          onClick={(e) => deleteProjectUtil(e)}
          className="shadow mx-3 bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          Delete Project
        </button>
      </div>
    </form>
  );
};

export default ProjectDetail;
