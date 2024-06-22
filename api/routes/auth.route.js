import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Auth Route!");
});

router.post("/register", registerUser);
router.post("/sign-in", loginUser);
export default router;