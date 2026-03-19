import { useState, useEffect } from "react";
import TaskForm from "./components/taskForm/TaskForm";
import TaskList from "./components/taskList/TaskList";
import { getTasks } from "./services/taskService";
import { deleteTask } from "./services/taskService";
import { toggleTaskCompletion } from "./services/taskService";
import { updateTask } from "./services/taskService";
import EditModal from "./components/editModal/EditModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("low");

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggle = async (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    await toggleTaskCompletion(id);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setIsModalOpen(true);
  };

  const submitEditing = async () => {
    await updateTask(editingTask.id, editTitle, editDescription, editPriority);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id
          ? {
              ...t,
              title: editTitle,
              description: editDescription,
              priority: editPriority,
            }
          : t,
      ),
    );
    setIsModalOpen(false);
  };

  const filteredTasks =
    tasks &&
    Array.isArray(tasks) &&
    tasks.filter((task) => {
      if (filter === "pending") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

  return (
    <>
      <div className="task_manager">
        <h1>Task Manager</h1>
        <br />
        <br />
        <div className="content">
          <TaskForm handleNewTask={handleNewTask} />
          <TaskList
            tasks={filteredTasks}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            handleEdit={handleEdit}
            setFilter={setFilter}
            filter={filter}
          />
        </div>
        {isModalOpen && (
          <EditModal
            submitEditing={submitEditing}
            setEditDescription={setEditDescription}
            setEditTitle={setEditTitle}
            setEditPriority={setEditPriority}
            setIsModalOpen={setIsModalOpen}
            editTitle={editTitle}
            editDescription={editDescription}
            editPriority={editPriority}
          />
        )}
      </div>
    </>
  );
}

export default App;
