import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Home = () => {
  
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Kanban Board.
            <strong className="font-extrabold text-red-700 sm:block">
              React and FAST API.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl sm:leading-relaxed">
            A simple Jira clone - create tasks and arrange them through drag and drop
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
