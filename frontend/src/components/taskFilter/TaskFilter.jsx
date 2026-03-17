import React from "react";
import "../../styles/TaskFilter.css";

const TaskFilter = ({ setFilter, filter }) => {
  const filterOptions = ["all", "completed", "pending"];
  return (
    <div className="filters">
      {filterOptions.map((option) => {
        return (
          <button
            className={`${filter === option ? "active" : ""}`}
            onClick={() => setFilter(option)}
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default TaskFilter;
