import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { createProject, resetVariables } from "../features/projects/projectSlice";

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const descriptionValue = watch("description", "");

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.projectData
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to create project");
      dispatch(resetVariables());
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage);
      dispatch(resetVariables());
      navigate("/projects");
    }
  }, [dispatch, isError, isSuccess, message, navigate, toastMessage]);

  const createProjectUtil = (data) => {
    dispatch(createProject(data));
    setToastMessage("Project created successfully!");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/projects" className="hover:text-slate-800 transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">New Project</span>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">
          
          {/* Header */}
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/10">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Create New Project
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Set up a workspace to manage backlog items, tasks, and sprint milestones.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(createProjectUtil)} className="space-y-6" noValidate>
            
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
                placeholder="e.g. Mobile App Redesign v2"
                className={`w-full px-4 py-2.5 bg-white border text-sm rounded-xl text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                  errors.title
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                {...register("title", {
                  required: "Project title is required.",
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
                  Project Description <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-medium text-slate-400">
                  {descriptionValue.length} characters
                </span>
              </div>
              <textarea
                id="description"
                rows="6"
                placeholder="Summarize the core objectives, deliverables, and team responsibilities..."
                className={`w-full px-4 py-3 bg-white border text-sm rounded-xl text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 resize-y ${
                  errors.description
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                {...register("description", {
                  required: "Project description is required.",
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

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link
                to="/projects"
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-600/25 transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create Project</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default AddProject;