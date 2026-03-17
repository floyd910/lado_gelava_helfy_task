import React, { useRef, useState } from "react";
import "../../styles/TaskForm.css";
import { createTask } from "../../services/taskService";

const TaskForm = ({ handleNewTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const priorities = ["low", "medium", "high"];

  const onCreate = async () => {
    if (!title || !description) return;

    const newTask = await createTask(title, description, priority);
    handleNewTask(newTask);

    setTitle("");
    setDescription("");
    setPriority("low");
  };

  return (
    <div className="task_form">
      <h2 className="box_title">Add Tasks</h2>
      <br />
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="7"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="priorities">
          {priorities.map((pr) => (
            <button
              type="button"
              className={`${pr} ${priority === pr ? "active priority_btn " : "priority_btn"}`}
              onClick={() => setPriority(pr)}
              key={pr}
            >
              {pr}
            </button>
          ))}
        </div>
        <button type="button" onClick={onCreate} className="submit_btn">
          Create
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
