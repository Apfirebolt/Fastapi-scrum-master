import React from "react";
import { useSelector } from "react-redux";


const Home = () => {
  const { profile } = useSelector((state) => state.auth);

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

          {profile && (
            <h1 className="text-xl my-4 font-extrabold sm:text-2xl">
              Welcome to Kanban Board,
              <strong className="font-extrabold text-blue-700 sm:block">
                {profile.username}
              </strong>
            </h1>
          )}

          <p className="mt-4 sm:text-xl sm:leading-relaxed">
            A simple Jira clone - create tasks and arrange them through drag and
            drop
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
