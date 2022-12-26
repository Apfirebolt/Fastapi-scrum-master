import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, updateTask } from "../features/tasks/taskSlice";

const Kanban = () => {
  const [stateData, updateStateData] = useState({});

  const { tasks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.taskData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    if (tasks.length) {
      let columnData = {
        "To Do": [],
        "In Progress": [],
        "In Review": [],
        Done: [],
      };
      tasks.forEach((item) => {
        columnData[item["status"]].push(item);
      });
      updateStateData(columnData);
    }
  }, [tasks]);

  function handleOnDragEnd(result) {
    if (result.destination.droppableId) {
      console.log(parseInt(result.draggableId), result.destination.droppableId)
      let payload = {
        id: parseInt(result.draggableId),
        status: result.destination.droppableId
      }
      dispatch(updateTask(payload))

      let newStateData = {...stateData};
      let destinationArray = Array.from(stateData[result.destination.droppableId])
      let sourceArray = Array.from(stateData[result.source.droppableId])

      const itemInserted = sourceArray[result.source.index]
      sourceArray.splice(result.source.index, 1)
      destinationArray.splice(result.destination.index, 0, itemInserted)
      newStateData[result.source.droppableId] = sourceArray
      newStateData[result.destination.droppableId] = destinationArray
      updateStateData(newStateData)
      }
  }

  return (
    <div className="App">
      <header className="App-header">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="dropped-content">
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
                      <h3>{name}</h3>
                      {stateData[name].map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="drop-list-item list-none text-red-400"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <p>{item.title}</p>
                                <Link
                                  to={`/task/${item.id}`}
                                  className="btn btn-reverse btn-sm"
                                >
                                  View
                                </Link>
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
      </header>
    </div>
  );
};

export default Kanban;
