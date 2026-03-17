const Task = require("../models/Task");

const createTask = (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    return res.status(400).json({
      error: "All fields are required!",
    });
  }

  const newTask = {
    ...Task.TaskModel,
    id: Date.now(),
    title,
    description,
    priority,
    completed: false,
    createdAt: new Date(),
  };

  Task.tasks.push(newTask);
  res.status(201).json(newTask);
};

const getAllTasks = async (req, res) => {
  try {
    const sortedTasks = Task.tasks.sort((a, b) => b.createdAt - a.createdAt);
    res.json(sortedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const task = Task.tasks.filter((taskItem) => {
      return taskItem.id === taskId;
    })[0];

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    Task.tasks = Task.tasks.filter((taskItem) => taskItem.id !== taskId);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({
        error: "All fields are required!",
      });
    }

    const taskId = Number(id);

    const taskToUpdate = Task.tasks.filter((taskItem) => {
      return taskItem.id === taskId;
    })[0];

    if (!taskToUpdate) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedData = {
      id: taskId,
      title,
      description,
      priority,
      completed: taskToUpdate.completed,
      createdAt: taskToUpdate.createdAt,
    };

    Task.tasks = Task.tasks.map((taskItem) =>
      taskItem.id === taskId ? updatedData : taskItem,
    );

    res.status(200).json({ message: "Task updated successfuly" });
  } catch (error) {
    console.error("Task update error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const toggleTaskCompletion = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const task = Task.tasks.filter((taskItem) => {
      return taskItem.id === taskId;
    })[0];

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    Task.tasks = Task.tasks.map((taskItem) =>
      taskItem.id === taskId
        ? { ...taskItem, completed: !taskItem.completed }
        : taskItem,
    );

    res.status(200).json({ message: "Task completion change successful" });
  } catch (error) {
    console.error("Error deleting item by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
};
