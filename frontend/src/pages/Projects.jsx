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
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Projects</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-7 px-2 gap-2 my-3">
        {projects.map((item, index) => {
          return (
            <ProjectCard key={index} project={item} />
          );
        })}
      </div>
    </div>
  );
};

export default Project;
