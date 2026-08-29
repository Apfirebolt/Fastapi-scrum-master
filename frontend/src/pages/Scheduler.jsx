import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../features/tasks/taskSlice";
import Loader from "../components/Loader";

const STATUS_CONFIG = {
  "To Do": {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
  "In Progress": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  "In Review": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
  Done: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
};

const Scheduler = () => {
  const [monthDays, setMonthDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [selectedDay, setSelectedDay] = useState(null);

  const { tasks, isLoading } = useSelector((state) => state.taskData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  // Generate calendar grid and map tasks
  useEffect(() => {
    const daysInCurrentMonth = currentMonth.daysInMonth();
    const days = [];

    for (let i = 0; i < daysInCurrentMonth; i += 1) {
      const currentDate = currentMonth.date(i + 1);
      days.push({
        fullDate: currentDate,
        dateString: currentDate.format("YYYY-MM-DD"),
        dayNumber: currentDate.format("D"),
        isToday: currentDate.isSame(dayjs(), "day"),
        tasks: [],
      });
    }

    if (tasks && tasks.length) {
      tasks.forEach((task) => {
        if (!task.dueDate) return;
        const taskDate = dayjs(task.dueDate).format("YYYY-MM-DD");
        const matchingDay = days.find((d) => d.dateString === taskDate);
        if (matchingDay) {
          matchingDay.tasks.push(task);
        }
      });
    }

    setMonthDays(days);
  }, [tasks, currentMonth]);

  const goToNextMonth = () => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  };

  const goToToday = () => {
    setCurrentMonth(dayjs().startOf("month"));
  };

  if (isLoading) {
    return <Loader text="Loading schedule..." />;
  }

  const startDayPadding = currentMonth.day(); // 0 (Sun) to 6 (Sat)
  const totalTasksThisMonth = monthDays.reduce((acc, d) => acc + d.tasks.length, 0);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header & Month Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Sprint Scheduler
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {totalTasksThisMonth} Scheduled
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Visualize task deliverables and sprint deadlines across the monthly calendar
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 shadow-2xs transition-colors"
            >
              Today
            </button>

            <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-2xs p-1">
              <button
                onClick={goToPreviousMonth}
                aria-label="Previous Month"
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span className="min-w-[140px] text-center text-sm font-bold text-slate-800 select-none">
                {currentMonth.format("MMMM YYYY")}
              </span>

              <button
                onClick={goToNextMonth}
                aria-label="Next Month"
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link
              to="/task"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Task</span>
            </Link>
          </div>
        </div>

        {/* Calendar Card Frame */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* Day of Week Header */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, idx) => (
              <div
                key={dayName}
                className={`py-3 text-xs font-semibold uppercase tracking-wider ${
                  idx === 0 || idx === 6 ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {dayName}
              </div>
            ))}
          </div>

          {/* Month Matrix */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 bg-slate-100/30">
            {/* Blank padding cells before day 1 */}
            {Array.from({ length: startDayPadding }).map((_, i) => (
              <div
                key={`empty-start-${i}`}
                className="min-h-[110px] sm:min-h-[130px] bg-slate-50/40 p-2"
              />
            ))}

            {/* Active Month Days */}
            {monthDays.map((dayItem) => {
              const hasTasks = dayItem.tasks.length > 0;

              return (
                <div
                  key={dayItem.dateString}
                  onClick={() => hasTasks && setSelectedDay(dayItem)}
                  className={`min-h-[110px] sm:min-h-[130px] p-2 flex flex-col bg-white transition-colors duration-150 relative group ${
                    dayItem.isToday ? "bg-blue-50/20 ring-1 ring-inset ring-blue-500/30" : ""
                  } ${hasTasks ? "cursor-pointer hover:bg-slate-50/80" : ""}`}
                >
                  {/* Date Number Badge */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`inline-flex items-center justify-center text-xs font-bold w-6 h-6 rounded-lg ${
                        dayItem.isToday
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {dayItem.dayNumber}
                    </span>

                    {hasTasks && (
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {dayItem.tasks.length}
                      </span>
                    )}
                  </div>

                  {/* Task Chips Container */}
                  <div className="flex-1 space-y-1.5 overflow-hidden">
                    {dayItem.tasks.slice(0, 3).map((task) => {
                      const badge = STATUS_CONFIG[task.status] || STATUS_CONFIG["To Do"];

                      return (
                        <Link
                          key={task.id}
                          to={`/task/${task.id}`}
                          onClick={(e) => e.stopPropagation()}
                          title={`${task.title} (${task.status})`}
                          className={`group/task flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border transition-all truncate ${badge.bg} ${badge.text} ${badge.border} hover:shadow-xs`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${badge.dot}`} />
                          <span className="truncate group-hover/task:underline">
                            {task.title}
                          </span>
                        </Link>
                      );
                    })}

                    {dayItem.tasks.length > 3 && (
                      <p className="text-[10px] font-semibold text-slate-500 pl-1">
                        +{dayItem.tasks.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Day Overview Modal (When clicking a day with tasks) */}
      <AnimatePresence>
        {selectedDay && (
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
                  <h3 className="text-base font-bold text-slate-900">
                    Tasks for {dayjs(selectedDay.dateString).format("MMMM D, YYYY")}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedDay.tasks.length} total deliverables due
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {selectedDay.tasks.map((task) => {
                  const badge = STATUS_CONFIG[task.status] || STATUS_CONFIG["To Do"];

                  return (
                    <div
                      key={task.id}
                      className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badge.bg} ${badge.text} ${badge.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {task.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            TASK-{task.id}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-800 truncate">
                          {task.title}
                        </h4>
                      </div>

                      <Link
                        to={`/task/${task.id}`}
                        className="flex-shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50"
                      >
                        Details →
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedDay(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scheduler;