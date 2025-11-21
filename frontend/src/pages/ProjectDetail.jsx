import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
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
  }, [dispatch, isError, isSuccess, navigate, message, toastMessage]);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Project Details
          </h2>
          
          <form
            onSubmit={handleSubmit(updateProjectUtil)}
            className="w-full"
          >
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Project Title"
                {...register("title", { required: true })}
                className={`appearance-none border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">Title is required.</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Project Description"
                rows="6"
                {...register("description", { required: true })}
                className={`appearance-none border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none resize-none`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  Description is required.
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mt-8">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition"
              >
                Update Project
              </button>
              <button
                type="button"
                onClick={deleteProjectUtil}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition"
              >
                Delete Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;

