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

export const getTaskByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const tasks = await Task.find({ status });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
}

export const taskDetails = async (req, res) => {
  try {
    const tasks = await Task.find();
    let back=0;
    let todo=0;
    let progress=0;
    let completed=0;
    tasks.forEach((task) => {
      if (task.status == "backlog") {
        back++;
      } else if (task.status == "todo") {
        todo++;
      } else if (task.status == "progress") {
        progress++;
      } else if (task.status == "done") {
        completed++;
      }
    });
    let high=0;
    let medium=0;
    let low=0;
    tasks.forEach((task) => {
      if (task.priority == "high") {
        high++;
      } else if (task.priority == "medium") {
        medium++;
      } else if (task.priority == "low") {
        low++;
      }
    });
    let dueDate=0;
    tasks.forEach((task) => {
      if (task.dueDate != null) {
        dueDate++;
      }
    });
    res.status(200).json({
      backlog: back,
      todo: todo,
      in_progress: progress,
      completed: completed,
      high: high,
      medium: medium,
      low: low,
      due_date: dueDate
    });
  } catch (error) {}
}