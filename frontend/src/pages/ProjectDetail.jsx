import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  updateProject,
  getProject,
  deleteProject,
  uploadProjectImages,
  deleteProjectImage,
  resetVariables,
} from "../features/projects/projectSlice";
import Loader from "../components/Loader";

const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1 MB

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const { project, isLoading, isImageUploading, isError, isSuccess, message } =
    useSelector((state) => state.projectData);

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
      if (toastMessage.includes("deleted")) {
        navigate("/projects");
      }
    }
  }, [dispatch, isError, isSuccess, navigate, message, toastMessage]);

  // Clean up object URLs on unmount or file reset
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleDelete = () => {
    setToastMessage("Project successfully deleted!");
    dispatch(deleteProject(params.projectId));
    setShowDeleteModal(false);
  };

  const handleUpdate = (data) => {
    setToastMessage("Project successfully updated!");
    dispatch(updateProject({ ...data, id: project.id }));
  };

  // Handle File Selection with 1 MB Validation
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const validFiles = [];
    const newPreviews = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`"${file.name}" is not an image file.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(`"${file.name}" exceeds the 1 MB limit (${(file.size / 1024 / 1024).toFixed(2)} MB).`);
        continue;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handleRemovePreview = (index) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCloseImageModal = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    setShowImageModal(false);
  };

  const handleUploadImages = async () => {
    if (!selectedFiles.length) {
      toast.warn("Please select at least one image to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await dispatch(
        uploadProjectImages({ projectId: params.projectId, formData })
      ).unwrap();
      toast.success("Images uploaded successfully!");
      handleCloseImageModal();
    } catch (err) {
      toast.error(err || "Failed to upload images");
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await dispatch(
        deleteProjectImage({ projectId: params.projectId, imageId })
      ).unwrap();
      toast.success("Image removed");
    } catch (err) {
      toast.error(err || "Failed to delete image");
    }
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
        className="w-full max-w-3xl space-y-6"
      >
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
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

        {/* Main Card Container */}
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
                  Update project metadata, view gallery assets, or manage workspaces.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6" noValidate>
            {/* Title */}
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

            {/* Description */}
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
                rows="5"
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

            {/* Project Images Gallery Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Project Gallery & Attachments
                  </label>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Cloudinary attachments linked to this project ({project?.images?.length || 0})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Image</span>
                </button>
              </div>

              {project?.images && project.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl">
                  {project.images.map((img) => (
                    <div
                      key={img.id}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-slate-200 border border-slate-200 shadow-2xs"
                    >
                      <img
                        src={img.image_url}
                        alt="Project attachment"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {/* Delete Overlay Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.id)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-slate-900/70 text-white opacity-0 group-hover:opacity-100 hover:bg-rose-600 transition-all shadow-sm"
                        title="Remove Image"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/40">
                  <p className="text-xs text-slate-400">No images uploaded yet.</p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
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

      {/* Upload Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Upload Project Images</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Maximum file size: 1 MB per image</p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseImageModal}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-700">Click to browse or drop images here</p>
                <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, WEBP up to 1 MB</p>
              </div>

              {/* Previews */}
              {previewUrls.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-700 mb-2">
                    Selected Files ({previewUrls.length}):
                  </p>
                  <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePreview(idx)}
                          className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseImageModal}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUploadImages}
                  disabled={isImageUploading || selectedFiles.length === 0}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isImageUploading ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    `Upload ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}`
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Project Deletion */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-100">
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
            <h3 className="text-lg font-bold text-slate-900 mb-1">Delete Project</h3>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{project?.title}"</span>? This will also remove all associated images from Cloudinary and tasks permanently.
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