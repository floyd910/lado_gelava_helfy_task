import React from "react";
import "../../styles/TaskList.css";
import Carousel from "../carousel/Carousel";
import TaskFilter from "../taskFilter/TaskFilter";

const TaskList = ({
  handleEdit,
  tasks,
  handleDelete,
  handleToggle,
  setFilter,
  filter,
}) => {
  return (
    <div className="task_list">
      {!tasks || tasks.length === 0 ? (
        <TaskFilter setFilter={setFilter} filter={filter} />
      ) : (
        <>
          <TaskFilter setFilter={setFilter} filter={filter} />
          <br />
          <Carousel
            tasks={tasks}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            handleEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default TaskList;
