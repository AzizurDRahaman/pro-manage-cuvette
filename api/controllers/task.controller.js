import Task from "../models/task.model.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, priority, assignedTo, checklist,author, dueDate } = req.body;

    const newTask = new Task({
      title,
      priority,
      author,
      assignedTo: assignedTo || "unassigned",
      dueDate: dueDate || null,
      checklist,
    });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, assignedTo, dueDate, checklist, status } =
      req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, priority, assignedTo, dueDate, checklist, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { id } = req.body;

    const tasks = await Task.find({
        $or: [
          { author: id },
          { assignedTo: id }
        ]
      }).sort({ createdAt: -1 });

    res.status(200).json({ tasks });

  }
  catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
}

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Error getting task", error });
  }
}