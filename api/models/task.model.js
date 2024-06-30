import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  priority: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    default: "unassigned",
  },
  status: {
    type: String,
    default: "todo",
  },
  checklist: [
    {
      task: {
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;