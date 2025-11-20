import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-start hover:shadow-xl transition-shadow duration-200">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4">{project.description || "No description provided."}</p>
      <div className="flex items-center w-full justify-between">
        <span className="text-sm text-gray-500">ID: {project.id}</span>
        <Link
          to={`/project/${project.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-150 text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
