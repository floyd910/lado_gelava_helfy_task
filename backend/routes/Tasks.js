const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
} = require("../controllers/taskController");
router.post("/tasks", createTask);
router.get("/tasks", getAllTasks);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/toggle", toggleTaskCompletion);
module.exports = router;
