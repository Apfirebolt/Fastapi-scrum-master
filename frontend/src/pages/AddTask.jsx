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
    <form onSubmit={handleSubmit((data) => createTaskUtil(data))} className="md:w-1/2 sm:w-3/4 mx-auto my-3">
      <p className="text-center text-2xl my-3 text-red-700">ADD TASK</p>
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
          placeholder="Task Title"
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
          placeholder="Task Description"
          rows="10"
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <p className="text-red-500">Description is required.</p>}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="project"
        >
          Project
        </label>
        <select
          {...register('project_id', { required: true })}  
          className="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
        >
          {projects.map((item, index) => (
              <option key={index} value={item.id}>{item.title}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          {...register('status', { required: true })}  
          className="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
        >
          {statusChoices.map((item, index) => (
              <option key={index} value={item}>{item}</option>
          ))}
        </select>
        {errors.status && <p className="text-red-500">Status is required.</p>}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dueDate"
        >
          Due Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dueDate"
          type="date"
          placeholder="Select Due Date"
          {...register('dueDate', { required: true })}
        />
        {errors.dueDate && <p className="text-red-500">Due Date is required.</p>}
      </div>

      <input className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="submit" value="Add Task" />
    </form>
  );
};

export default AddTask;