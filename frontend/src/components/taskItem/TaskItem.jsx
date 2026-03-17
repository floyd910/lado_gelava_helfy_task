import React from "react";
import "../../styles/TaskItem.css";
import { IoIosCloseCircle } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";

const TaskItem = ({ handleEdit, task, handleDelete, handleToggle }) => {
  return (
    <div
      key={task.id}
      className="task_item"
      style={{ background: task.completed ? "lightgreen" : "transparent" }}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`badge ${task.priority}`}>{task.priority}</span>
      <button className="delete_btn" onClick={() => handleDelete(task.id)}>
        <IoIosCloseCircle size="42px" color="#777"></IoIosCloseCircle>
      </button>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleToggle(task.id)}
        />
      </label>
      <button className="edit_btn" onClick={() => handleEdit(task)}>
        <MdEditSquare size="38px" color="orange" />
      </button>
    </div>
  );
};

export default TaskItem;
