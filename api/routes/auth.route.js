import express from "express";
import { registerUser } from "../controllers/auth.controller.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Auth Route!");
});

router.post("/register", registerUser);
export default router;