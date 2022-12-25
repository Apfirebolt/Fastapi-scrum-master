import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../features/tasks/taskSlice";

const Kanban = () => {
  const [stateData, updateStateData] = useState({});
  const [counter, setCounter] = useState(9);

  const statusColumns = ['To Do', 'In Progress', 'In Review', 'Completed']

  const { tasks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.taskData
  );

  console.log(tasks, isLoading, isError, isSuccess, message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);


  function handleOnDragEnd(result) {
    console.log(result)
  }

  return (
    <div className="App">
      <header className="App-header">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="dropped-content">
            {statusColumns.map((name, index) => {
              return (
                <Droppable key={name} droppableId={name} index={index}>
                  {(provided) => (
                    <div
                      className="dropped-container"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h3>{name}</h3>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
          <div className="dropped-content">
            <Droppable key="task-list" droppableId="task-list">
              {(provided) => (
                <div
                  className="dropped-container"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <h3>Task</h3>

                  {tasks.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.title}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="drop-list-item list-none text-red-400"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>
                              {item.title}
                            </p>
                            <Link to={`/task/${item.id}`} className='btn btn-reverse btn-sm'>
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
          </div>
        </DragDropContext>
      </header>
    </div>
  );
};

export default Kanban;
