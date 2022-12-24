import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../features/tasks/taskSlice";
import initialData from "../data/items";

const Home = () => {
  
  
  const [stateData, updateStateData] = useState(initialData);
  const [counter, setCounter] = useState(9);

  const { tasks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.taskData
  )

  console.log(tasks, isLoading, isError, isSuccess, message)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    // remove from source array and put in destination array
    let newStateData = { ...stateData };
    let destinationArray = Array.from(
      stateData.columns[result.destination.droppableId].taskIds
    );
    let sourceArray = Array.from(
      stateData.columns[result.source.droppableId].taskIds
    );

    if (result.draggableId !== 'Source') {
      const itemInserted = sourceArray[result.source.index];
      sourceArray.splice(result.source.index, 1);
      destinationArray.splice(result.destination.index, 0, itemInserted);
      newStateData.columns[result.source.droppableId].taskIds = sourceArray;
      newStateData.columns[result.destination.droppableId].taskIds = destinationArray;
    } else {
      let itemCreated = 'item-' + counter.toString();
      setCounter(counter+1)
      destinationArray.push(itemCreated)
      newStateData.columns[result.destination.droppableId].taskIds = destinationArray;
      console.log('Created item', itemCreated)
    }
    updateStateData(newStateData);

    console.log("New state data ", newStateData, result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p className="text-3xl text-blue-600">Weekly Planner</p>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="dropped-content">
            {initialData.columnOrder.map((name, index) => {
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

                      {initialData.columns[name].taskIds.map((item, index) => {
                        return (
                          <Draggable
                            key={item}
                            draggableId={item}
                            index={index}
                          >
                            {(provided) => (
                              <p
                                className="drop-list-item list-none text-red-400"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item} - Come
                              </p>
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

export default Home;
