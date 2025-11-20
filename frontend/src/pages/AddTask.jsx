import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { createTask, resetVariables } from "../features/tasks/taskSlice";
import { getProjects } from "../features/projects/projectSlice";

const AddTask = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statusChoices = ["To Do", "In Progress", "In Review", "Done"];
  const [toastMessage, setToastMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isError, isSuccess, message } = useSelector(
    (state) => state.taskData
  );

  const { projects } = useSelector((state) => state.projectData);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

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

  const createTaskUtil = (data) => {
    dispatch(createTask(data))
    setToastMessage('Task created successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">Add New Task</h1>
          
          <form onSubmit={handleSubmit((data) => createTaskUtil(data))} className="space-y-6">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none"
                id="title"
                type="text"
                placeholder="Enter task title"
                {...register('title', { required: true })}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">Title is required.</p>}
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none resize-none"
                id="description"
                placeholder="Describe the task"
                rows="6"
                {...register('description', { required: true })}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">Description is required.</p>}
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="project"
              >
                Project
              </label>
              <select
                {...register('project_id', { required: true })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none bg-white cursor-pointer"
                aria-label="Select project"
              >
                {projects.map((item, index) => (
                  <option key={index} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                {...register('status', { required: true })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none bg-white cursor-pointer"
                aria-label="Select status"
              >
                {statusChoices.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
              {errors.status && <p className="text-red-500 text-sm mt-1">Status is required.</p>}
            </div>

            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none"
                id="dueDate"
                type="date"
                {...register('dueDate', { required: true })}
              />
              {errors.dueDate && <p className="text-red-500 text-sm mt-1">Due Date is required.</p>}
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200"
              type="submit"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;