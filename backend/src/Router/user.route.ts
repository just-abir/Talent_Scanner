import express from "express";
import userController from "../Controllers/user.controller.js";

import userMiddleware from "../Middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", userController.userRegister);

router.post("/login", userController.userLogin);
router.get("/logout", userController.userLogout);

router.get("/getMe", userMiddleware.authMiddleware, userController.getMe);

export default router;
