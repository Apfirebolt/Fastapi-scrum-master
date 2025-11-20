import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../features/projects/projectSlice";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";

const Project = () => {
  const { projects, isLoading } = useSelector((state) => state.projectData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Your Projects</h1>
          <p className="text-gray-600 text-lg">Browse and manage your active projects</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-xl py-10">
              No projects found.
            </div>
          ) : (
            projects.map((item, index) => (
              <ProjectCard key={item.id || index} project={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
