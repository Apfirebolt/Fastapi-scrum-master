import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      navigate('/projects')
    }
  }, [dispatch, isError, isSuccess, message, navigate, toastMessage])

  const createProjectUtil = (data) => {
    dispatch(createProject(data))
    setToastMessage('Project created successfully!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Create New Project
          </h2>
          
          <form onSubmit={handleSubmit((data) => createProjectUtil(data))} className="space-y-6">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="title"
              >
                Project Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                id="title"
                type="text"
                placeholder="Enter project title"
                {...register('title', { required: true })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">Title is required.</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="description"
              >
                Project Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none resize-none"
                id="description"
                placeholder="Describe your project"
                rows="8"
                {...register('description', { required: true })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">Description is required.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddProject;