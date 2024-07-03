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
  const taskAssigned = await Task.find({ assignedTo: email }).sort({
    createdAt: -1,
    dueDate: 1,
  });
  if (taskAssigned.length > 0) {
    // loop through the taskAssigned and push every tasks' _id to the user's tasks array
    for (let i = 0; i < taskAssigned.length; i++) {
      user.tasks.push(taskAssigned[i]._id);
    }
  }

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "240h",
    });
    res.status(200).json({
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
      peoples: user.peoples,
    });
  } catch (err) {
    next(err);
  }
};


export const addPeople = async (req, res) => {
  try{
    const { email, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if(user.peoples.includes(email)){
    return res.status(400).json({ message: "User already added" });
  }
  user.peoples.push(email);
  await user.save();
  res.status(200).json({ message: "People added successfully" });
  }catch(error){
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { name, email, old_password, update_password } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const hashedPassword = await bcrypt.hash(update_password, 10);
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "User updated successfully" });

  }catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}