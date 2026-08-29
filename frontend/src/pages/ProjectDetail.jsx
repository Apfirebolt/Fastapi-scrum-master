import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  updateProject,
  getProject,
  deleteProject,
  resetVariables,
} from "../features/projects/projectSlice";
import Loader from "../components/Loader";

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { project, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.projectData
  );

  useEffect(() => {
    dispatch(getProject(params.projectId));
  }, [dispatch, params.projectId]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const descriptionValue = watch("description", "");

  useEffect(() => {
    if (project) {
      reset({
        title: project.title || "",
        description: project.description || "",
      });
    }
  }, [project, reset]);

  useEffect(() => {
    if (isError) {
      toast.error(message || "An error occurred");
      dispatch(resetVariables());
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage);
      dispatch(resetVariables());
      navigate("/projects");
    }
  }, [dispatch, isError, isSuccess, navigate, message, toastMessage]);

  const handleDelete = () => {
    setToastMessage("Project successfully deleted!");
    dispatch(deleteProject(params.projectId));
    setShowDeleteModal(false);
  };

  const handleUpdate = (data) => {
    setToastMessage("Project successfully updated!");
    dispatch(updateProject({ ...data, id: project.id }));
  };

  if (isLoading && !project?.title) {
    return <Loader />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        {/* Top Breadcrumb Navigation */}
        <div className="mb-6 flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/projects" className="hover:text-slate-800 transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">
              {project?.title || "Project Details"}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            ID: #{params.projectId}
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Project Settings
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Update project metadata or remove this workspace permanently.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6" noValidate>
            
            {/* Project Title Field */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
                htmlFor="title"
              >
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Project Title"
                className={`w-full px-4 py-2.5 bg-white border text-sm rounded-xl text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                  errors.title
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                {...register("title", {
                  required: "Title is required.",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters.",
                  },
                })}
              />
              {errors.title && (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                  <span className="font-semibold">•</span> {errors.title.message}
                </p>
              )}
            </div>

            {/* Project Description Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                  htmlFor="description"
                >
                  Description <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-medium text-slate-400">
                  {descriptionValue.length} characters
                </span>
              </div>
              <textarea
                id="description"
                rows="6"
                placeholder="Project Description"
                className={`w-full px-4 py-3 bg-white border text-sm rounded-xl text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 resize-y ${
                  errors.description
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                {...register("description", {
                  required: "Description is required.",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters.",
                  },
                })}
              />
              {errors.description && (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                  <span className="font-semibold">•</span> {errors.description.message}
                </p>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Delete Project</span>
              </button>

              <div className="flex items-center gap-3">
                <Link
                  to="/projects"
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading || !isDirty}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-600/25 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </form>

        </div>
      </motion.div>

      {/* Confirmation Modal for Deletion */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Delete Project
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{project?.title}"</span>? This action cannot be undone and will delete all associated task records.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Keep Project
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;