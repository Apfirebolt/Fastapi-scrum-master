import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../features/tasks/taskSlice";
import Loader from "../components/Loader";

const Scheduler = () => {
  const [monthDays, setMonthDays] = useState([]);

  const { tasks, isLoading } = useSelector((state) => state.taskData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    let days = [];
    let startDate = dayjs().startOf("month");
    let daysInCurrentMonth = startDate.daysInMonth();

    for (let i = 0; i < daysInCurrentMonth; i += 1) {
      let currentDate = startDate.add(i, "day");
      let currentObject = {
        date: currentDate.format("MMMM D, YYYY"),
        tasks: [],
      };
      days.push(currentObject);
    }

    tasks &&
      tasks.forEach((item) => {
        let currentDate = dayjs(item["dueDate"]).format("MMMM D, YYYY");
        let dateObj = days.find((item) => item.date === currentDate);
        dateObj.tasks.push(item);
      });
    setMonthDays(days);
  }, [tasks]);

  console.log(monthDays);

  if (isLoading) {
    return <Loader />;
  }

  console.log(tasks);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Scheduler</h1>
        </div>
      </div>
      <div className="grid grid-cols-7 px-2 gap-2">
        {monthDays.map((item, index) => {
          return (
            <div
              key={index}
              className="p-6 my-2 bg-blue-300 text-gray-700 text-center shadow-inner"
            >
              <p>{dayjs(item.date).format("MMMM D, YYYY")}</p>
              {item.tasks.length &&
                item.tasks.map((item, index) => {
                  return (
                    <div key={index} className="bg-gray-100 px-3 py-2 shadow-lg rounded-md my-2">
                      <p>{item.title}</p>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scheduler;
