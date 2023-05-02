import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../features/tasks/taskSlice";
import Loader from '../../components/Loader';

const AllTasks = () => {

  const { tasks, isLoading } = useSelector(
    (state) => state.taskData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  console.log(tasks)


  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to
            <strong className="font-extrabold text-red-700 sm:block">
              Admin - Tasks
            </strong>
          </h1>

        </div>
      </div>
    </div>
  );
};

export default AllTasks;
