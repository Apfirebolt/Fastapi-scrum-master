import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, updateTask } from "../features/tasks/taskSlice";
import Loader from "../components/Loader";

const COLUMNS = [
  { id: "To Do", label: "To Do", dotColor: "bg-slate-400", badgeColor: "bg-slate-100 text-slate-700" },
  { id: "In Progress", label: "In Progress", dotColor: "bg-amber-500", badgeColor: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "In Review", label: "In Review", dotColor: "bg-purple-500", badgeColor: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "Done", label: "Done", dotColor: "bg-emerald-500", badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

const Kanban = () => {
  const [stateData, updateStateData] = useState({
    "To Do": [],
    "In Progress": [],
    "In Review": [],
    "Done": [],
  });

  const { tasks, isLoading } = useSelector((state) => state.taskData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    const columnData = {
      "To Do": [],
      "In Progress": [],
      "In Review": [],
      "Done": [],
    };

    if (tasks && tasks.length) {
      tasks.forEach((item) => {
        if (columnData[item.status]) {
          columnData[item.status].push(item);
        } else {
          columnData["To Do"].push(item);
        }
      });
    }
    updateStateData(columnData);
  }, [tasks]);

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Optimistic UI updates
    const sourceList = Array.from(stateData[source.droppableId] || []);
    const destList = source.droppableId === destination.droppableId
      ? sourceList
      : Array.from(stateData[destination.droppableId] || []);

    const [movedItem] = sourceList.splice(source.index, 1);
    const updatedItem = { ...movedItem, status: destination.droppableId };

    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, updatedItem);
      updateStateData({ ...stateData, [source.droppableId]: sourceList });
    } else {
      destList.splice(destination.index, 0, updatedItem);
      updateStateData({
        ...stateData,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      });

      // Sync with API
      dispatch(
        updateTask({
          id: parseInt(draggableId, 10),
          status: destination.droppableId,
        })
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const totalTasks = tasks?.length || 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Top Header & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200/80 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Sprint Board
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {totalTasks} {totalTasks === 1 ? "Task" : "Tasks"}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Drag and drop cards across columns to update workflow progression
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/task"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Task</span>
            </Link>
          </div>
        </div>

        {/* Kanban Board Container */}
        {totalTasks === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-dashed border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No tasks in your backlog</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
              Create tasks and assign them to your team to begin tracking sprint deliverables.
            </p>
            <Link
              to="/task"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
            >
              + Create First Task
            </Link>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {COLUMNS.map((col) => {
                const columnTasks = stateData[col.id] || [];

                return (
                  <div
                    key={col.id}
                    className="flex flex-col rounded-2xl bg-slate-100/70 border border-slate-200/80 p-3.5 min-h-[580px]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-3 px-1.5 border-b border-slate-200/60 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                          {col.label}
                        </h3>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-white text-slate-600 border border-slate-200 shadow-2xs">
                        {columnTasks.length}
                      </span>
                    </div>

                    {/* Droppable Card Area */}
                    <Droppable droppableId={col.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 space-y-3 rounded-xl transition-colors duration-150 p-1 ${
                            snapshot.isDraggingOver ? "bg-blue-50/60 ring-2 ring-blue-400/30" : ""
                          }`}
                        >
                          {columnTasks.map((item, index) => {
                            const isDueSoon = item.dueDate && dayjs(item.dueDate).diff(dayjs(), "day") <= 2;

                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`group bg-white rounded-xl p-4 border transition-all duration-200 select-none ${
                                      snapshot.isDragging
                                        ? "shadow-2xl ring-2 ring-blue-500/40 border-blue-400 rotate-1 scale-[1.02] z-50"
                                        : "shadow-xs border-slate-200/90 hover:border-slate-300 hover:shadow-md"
                                    }`}
                                  >
                                    {/* Card Header & Task ID */}
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                      <span className="text-[11px] font-semibold text-slate-400">
                                        TASK-{item.id}
                                      </span>
                                      {item.projectId && (
                                        <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                          PRJ-{item.projectId}
                                        </span>
                                      )}
                                    </div>

                                    {/* Task Title */}
                                    <h4 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors">
                                      {item.title}
                                    </h4>

                                    {/* Task Description */}
                                    {item.description && (
                                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                                        {item.description}
                                      </p>
                                    )}

                                    {/* Footer Info & Action */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                      {/* Due Date Indicator */}
                                      {item.dueDate ? (
                                        <div
                                          className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                                            isDueSoon ? "text-amber-600 font-semibold" : "text-slate-400"
                                          }`}
                                        >
                                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          <span>{dayjs(item.dueDate).format("MMM D")}</span>
                                        </div>
                                      ) : (
                                        <div />
                                      )}

                                      {/* Link to Task Details */}
                                      <Link
                                        to={`/task/${item.id}`}
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                      >
                                        Details →
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default Kanban;