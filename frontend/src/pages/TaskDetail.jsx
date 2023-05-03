import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateTask,
  getTask,
  deleteTask,
  resetVariables,
} from "../features/tasks/taskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const statusChoices = ["To Do", "In Progress", "In Review", "Done"];
  const [toastMessage, setToastMessage] = useState("");
  

  useEffect(() => {
    dispatch(getTask(params.taskId));
  }, [dispatch, params.taskId]);

  const { task, isError, isSuccess, message } = useSelector(
    (state) => state.taskData
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
      navigate("/kanban");
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
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate
    });
  }, [task, reset]);

  const deleteTaskUtil = (e) => {
    e.preventDefault();
    setToastMessage("Task successfully deleted!");
    dispatch(deleteTask(params.taskId));
  };

  const updateTaskUtil = (data) => {
    setToastMessage("Task successfully updated!");
    data.id = task.id;
    dispatch(updateTask(data));
  };

  return (
    <form
      onSubmit={handleSubmit((data) => updateTaskUtil(data))}
      className="md:w-1/2 sm:w-3/4 mx-auto my-3"
    >
      <p className="text-center text-2xl my-3 text-red-700">TASK DETAIL</p>
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
          placeholder="Task Description"
          rows="10"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500">Description is required.</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          {...register("status", { required: true })}
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
            <option key={index} value={item}>
              {item}
            </option>
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

      <div>
        <input
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
          value="Update Task"
        />
        <button
          onClick={(e) => deleteTaskUtil(e)}
          className="shadow mx-3 bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          Delete Task
        </button>
      </div>
    </form>
  );
};

export default AddTask;
