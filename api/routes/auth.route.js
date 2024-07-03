import express from "express";
import { addPeople, getUserInfo, loginUser, registerUser, updateUser } from "../controllers/auth.controller.js"
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Auth Route!");
});

router.post("/register", registerUser);
router.post("/sign-in", loginUser);
router.patch("/add", verifyAuth, addPeople);
router.get("/get/:userId", verifyAuth, getUserInfo);
router.patch("/update/:userId", verifyAuth, updateUser);
export default router;