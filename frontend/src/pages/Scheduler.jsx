import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../features/tasks/taskSlice";
import Loader from "../components/Loader";

const Scheduler = () => {
  const [monthDays, setMonthDays] = useState([]);
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));

  const { tasks, isLoading } = useSelector((state) => state.taskData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    let days = [];
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
        if (dateObj) {
          dateObj.tasks.push(item);
        }
      });
    setMonthDays(days);
  }, [tasks, startDate]);

  const goToNextMonth = () => {
    let nextMonth = startDate.add(1, "month");
    setStartDate(nextMonth);
    updateTaskData(nextMonth);
  };

  const goToPreviousMonth = () => {
    let previousMonth = startDate.add(-1, "month");
    setStartDate(previousMonth);
    updateTaskData(previousMonth);
  };

  const updateTaskData = (month) => {
    let days = [];
    let daysInCurrentMonth = month.daysInMonth();
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
        if (dateObj) {
          dateObj.tasks.push(item);
        }
      });
    setMonthDays(days);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4 md:mb-0">📅 Scheduler</h1>
          <div className="flex items-center gap-4">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
              onClick={goToPreviousMonth}
            >
              ← Prev
            </button>
            <span className="text-xl font-semibold text-indigo-900">
              {dayjs(startDate).format("MMMM YYYY")}
            </span>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
              onClick={goToNextMonth}
            >
              Next →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center font-bold text-indigo-600">{d}</div>
          ))}
          {/* Padding for first day of month */}
          {(() => {
            const firstDay = dayjs(startDate).day();
            return Array.from({ length: firstDay }).map((_, i) => (
              <div key={`pad-${i}`} />
            ));
          })()}
          {monthDays.map((item, idx) => (
            <div
              key={idx}
              className="bg-indigo-50 border border-indigo-200 rounded-lg p-2 min-h-[100px] flex flex-col"
            >
              <div className="text-xs font-semibold text-indigo-700 mb-2">
                {dayjs(item.date).format("D")}
              </div>
              <div className="flex-1 space-y-1 overflow-y-auto">
                {item.tasks.length ? (
                  item.tasks.map((task, tIdx) => (
                    <div
                      key={tIdx}
                      className="bg-indigo-200 text-indigo-900 rounded px-2 py-1 text-xs font-medium shadow"
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-xs italic">No tasks</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Scheduler;
