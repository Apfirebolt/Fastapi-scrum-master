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
    <div className="App">
      <header className="App-header">
        {tasks && tasks.length ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="dropped-content grid grid-cols-2 md:grid-cols-4">
              {Object.keys(stateData).map((name, index) => {
                return (
                  <Droppable key={name} droppableId={name}>
                    {(provided) => (
                      <div
                        className="dropped-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3 className="text-2xl text-center my-2 bg-red-600 text-white p-2 rounded">
                          {name}
                        </h3>
                        {stateData[name].map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="max-w-sm rounded overflow-hidden shadow-lg my-3 bg-white p-3"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="px-6 py-4">
                                    <p className="font-bold text-xl mb-2">
                                      {item.title}
                                    </p>
                                    <p className="text-gray-700 text-base">
                                      {item.description}
                                    </p>
                                    <p className="text-gray-700 my-3 text-base text-bold">
                                      Due on - {dayjs(item.dueDate).format('DD/MM/YYYY')}
                                    </p>
                                  </div>
                                  <div className="p-3 text-center">
                                    <Link
                                      to={`/task/${item.id}`}
                                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                    >
                                      View
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
                );
              })}
            </div>
          </DragDropContext>
        ) : (
          <p className="text-xl my-3 text-center">No Tasks available</p>
        )}
      </header>
    </div>
  );
};

export default Kanban;
