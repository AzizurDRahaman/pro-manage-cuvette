import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const taskAssigned = await Task.find({ assignedTo: email}).sort({ createdAt: -1, dueDate: 1 });
    if(taskAssigned.length > 0) {
        // loop through the taskAssigned and push every tasks' _id to the user's tasks array
        for (let i = 0; i < taskAssigned.length; i++) {
            user.tasks.push(taskAssigned[i]._id);
        }
    }

    try {
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}