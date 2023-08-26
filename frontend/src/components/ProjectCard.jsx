import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <div className="bg-gray-100 px-2 text-center py-3">
      <h2 className="text-lg text-red-600">{project.title}</h2>
      <div className="my-3">
        <Link
          to={`/project/${project.id}`}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
