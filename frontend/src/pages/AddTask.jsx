import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createTask, resetVariables } from "../features/tasks/taskSlice";
import { getProjects } from "../features/projects/projectSlice";

const STATUS_CHOICES = [
  { value: "To Do", label: "To Do", dot: "bg-slate-400" },
  { value: "In Progress", label: "In Progress", dot: "bg-amber-500" },
  { value: "In Review", label: "In Review", dot: "bg-purple-500" },
  { value: "Done", label: "Done", dot: "bg-emerald-500" },
];

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "To Do",
      project_id: "",
      dueDate: "",
    },
  });

  const descriptionValue = watch("description", "");

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.taskData
  );
  const { projects, isLoading: projectsLoading } = useSelector(
    (state) => state.projectData
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to create task");
      dispatch(resetVariables());
    }

    if (isSuccess && toastMessage) {
      toast.success(toastMessage);
      dispatch(resetVariables());
      navigate("/kanban");
    }
  }, [dispatch, isError, isSuccess, message, navigate, toastMessage]);

  const createTaskUtil = (data) => {
    dispatch(createTask(data));
    setToastMessage("Task created successfully!");
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
          <Link to="/kanban" className="hover:text-slate-800 transition-colors">
            Sprint Board
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">New Task</span>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">
          
          {/* Header */}
          <div className="flex items-start gap-4 pb-6 border-b border-slate-100 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/10">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Create New Task
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Assign work items, set delivery deadlines, and track sprint progression.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(createTaskUtil)} className="space-y-6" noValidate>
            
            {/* Task Title */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
                htmlFor="title"
              >
                Task Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Implement OAuth2 Refresh Token Flow"
                className={`w-full px-4 py-2.5 bg-white border text-sm rounded-xl text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                  errors.title
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                {...register("title", {
                  required: "Task title is required.",
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

            {/* Task Description */}
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
                rows="4"
                placeholder="Provide technical scope, acceptance criteria, or relevant links..."
                className={`w-full px-4 py-3 bg-white border text-sm rounded-xl text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 resize-y ${
                  errors.description
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                {...register("description", {
                  required: "Description is required.",
                  minLength: {
                    value: 5,
                    message: "Description must be at least 5 characters.",
                  },
                })}
              />
              {errors.description && (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                  <span className="font-semibold">•</span> {errors.description.message}
                </p>
              )}
            </div>

            {/* Project & Status Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Project Select */}
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
                  htmlFor="project_id"
                >
                  Assigned Project <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="project_id"
                    disabled={projectsLoading}
                    className={`w-full appearance-none px-4 py-2.5 bg-white border text-sm rounded-xl text-slate-900 transition-all focus:outline-none focus:ring-2 pr-10 cursor-pointer ${
                      errors.project_id
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    {...register("project_id", { required: "Please select a project." })}
                  >
                    <option value="">Select project...</option>
                    {projects?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.project_id && (
                  <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                    <span className="font-semibold">•</span> {errors.project_id.message}
                  </p>
                )}
              </div>

              {/* Status Select */}
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
                  htmlFor="status"
                >
                  Workflow Status <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="status"
                    className={`w-full appearance-none px-4 py-2.5 bg-white border text-sm rounded-xl text-slate-900 transition-all focus:outline-none focus:ring-2 pr-10 cursor-pointer ${
                      errors.status
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    {...register("status", { required: "Please select a status." })}
                  >
                    {STATUS_CHOICES.map((choice) => (
                      <option key={choice.value} value={choice.value}>
                        {choice.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.status && (
                  <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                    <span className="font-semibold">•</span> {errors.status.message}
                  </p>
                )}
              </div>

            </div>

            {/* Due Date Field */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2"
                htmlFor="dueDate"
              >
                Target Due Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="dueDate"
                  type="date"
                  className={`w-full px-4 py-2.5 bg-white border text-sm rounded-xl text-slate-900 transition-all focus:outline-none focus:ring-2 ${
                    errors.dueDate
                      ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  {...register("dueDate", { required: "Due date is required." })}
                />
              </div>
              {errors.dueDate && (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                  <span className="font-semibold">•</span> {errors.dueDate.message}
                </p>
              )}
            </div>

            {/* Actions Row */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link
                to="/kanban"
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
                    <span>Adding Task...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create Task</span>
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

export default AddTask;