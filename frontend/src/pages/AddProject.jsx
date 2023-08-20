import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { createProject, resetVariables } from "../features/projects/projectSlice";

const AddProject = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isError, isSuccess, message } = useSelector(
    (state) => state.projectData
  );

  useEffect(() => {

    if (isError) {
      toast.error(message)
      dispatch(resetVariables())
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage)
      dispatch(resetVariables())
      navigate('/kanban')
    }
  }, [dispatch, isError, isSuccess, message, navigate, toastMessage])

  const createProjectUtil = (data) => {
    dispatch(createProject(data))
    setToastMessage('Project created successfully!')
  }

  return (
    <form onSubmit={handleSubmit((data) => createProjectUtil(data))} className="md:w-1/2 sm:w-3/4 mx-auto my-3">
      <p className="text-center text-2xl my-3 text-red-700">ADD Project</p>
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
          {...register('title', { required: true })}
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
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <p className="text-red-500">Description is required.</p>}
      </div>

      <input className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="submit" value="Add Project" />
    </form>
  );
};

export default AddProject;