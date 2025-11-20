import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, updateTask } from "../features/tasks/taskSlice";
import Loader from '../components/Loader';

const Kanban = () => {
  const [stateData, updateStateData] = useState({});

  const { tasks, isLoading } = useSelector(
    (state) => state.taskData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks && tasks.length) {
      let columnData = {
        "To Do": [],
        "In Progress": [],
        "In Review": [],
        "Done": [],
      };
      tasks.forEach((item) => {
        columnData[item["status"]].push(item);
      });
      updateStateData(columnData);
    }
  }, [tasks]);

  function handleOnDragEnd(result) {
    if (result.destination.droppableId) {

      let payload = {
        id: parseInt(result.draggableId),
        status: result.destination.droppableId,
      };
      dispatch(updateTask(payload));

      let newStateData = { ...stateData };
      let destinationArray = Array.from(
        stateData[result.destination.droppableId]
      );
      let sourceArray = Array.from(stateData[result.source.droppableId]);
      if (result.destination.droppableId !== result.source.droppableId) {
        const itemInserted = sourceArray[result.source.index];
        sourceArray.splice(result.source.index, 1);
        destinationArray.splice(result.destination.index, 0, itemInserted);
        newStateData[result.source.droppableId] = sourceArray;
        newStateData[result.destination.droppableId] = destinationArray;
        updateStateData(newStateData);
      }
    }
  }

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Task Board</h1>
        {tasks && tasks.length ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.keys(stateData).map((name, index) => {
                const columnColors = {
                  "To Do": "from-blue-500 to-blue-600",
                  "In Progress": "from-yellow-500 to-orange-500",
                  "In Review": "from-purple-500 to-purple-600",
                  "Done": "from-green-500 to-green-600"
                };
                return (
                  <Droppable key={name} droppableId={name}>
                    {(provided, snapshot) => (
                      <div
                        className={`rounded-xl p-4 min-h-[500px] transition-all ${
                          snapshot.isDraggingOver ? 'bg-white shadow-2xl scale-105' : 'bg-white/80 shadow-lg'
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <h3 className={`text-xl font-bold text-center mb-4 bg-gradient-to-r ${columnColors[name]} text-white p-3 rounded-lg shadow-md`}>
                          {name}
                          <span className="ml-2 text-sm bg-white/20 rounded-full px-2 py-1">
                            {stateData[name].length}
                          </span>
                        </h3>
                        <div className="space-y-3">
                          {stateData[name].map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 bg-white border-l-4 border-indigo-500 ${
                                      snapshot.isDragging ? 'rotate-2 scale-105' : ''
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div className="p-4">
                                      <h4 className="font-bold text-lg mb-2 text-gray-800">
                                        {item.title}
                                      </h4>
                                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                        {item.description}
                                      </p>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center text-xs text-gray-500">
                                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                          {dayjs(item.dueDate).format('DD/MM/YYYY')}
                                        </div>
                                        <Link
                                          to={`/task/${item.id}`}
                                          className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
                                        >
                                          View
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </DragDropContext>
        ) : (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-2xl font-semibold text-gray-600">No Tasks Available</p>
            <p className="text-gray-500 mt-2">Create your first task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kanban;
