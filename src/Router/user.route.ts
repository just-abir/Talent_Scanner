import express from "express";
import userController from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/register", userController.userRegister);

router.post("/login", userController.userLogin);
router.get("/logout", userController.userLogout);

export default router;
