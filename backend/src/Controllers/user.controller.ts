import type { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler.js";
import userModel from "../Model/user.model.js";
import sendResponse from "../Utils/sendResponse.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import backlistTokenModel from "../Model/backlist.mode.js";

/**
 * Post/api/user/register
 */

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  const userExist = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (userExist) {
    return sendResponse(res, 400, "username or email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = await userModel.create({
    userName,
    email,
    password: passwordHash,
  });

  const payload = {
    id: newUser._id,
    email: newUser.email,
    userName: newUser.userName,
  };
  const token: string = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: 3600 * 24,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const userData = {
    id: newUser._id,
    userName: newUser.userName,
    email: newUser.email,
    profileImage: newUser.profileImage,
    role: newUser.role,
    isVerified: newUser.isVerified,
    isActive: newUser.isActive,
  };

  return sendResponse(res, 201, "User registerd successfully", userData, {
    token,
  });
});

/**
 * Post/api/user/login
 */

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) return sendResponse(res, 400, "This user does not exsit");

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return sendResponse(res, 400, "Password does not match");
  }

  const payload = {
    id: user._id,
    email: user.email,
    userName: user.userName,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: 3600 * 24,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const userData = {
    id: user._id,
    userName: user.userName,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
    isVerified: user.isVerified,
    isActive: user.isActive,
  };

  return sendResponse(res, 200, "Login success", userData);
});

/**
 * @Method Get/api/user/logout
 * @description: get token
 */

const userLogout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.token;

  const tokenSave = await backlistTokenModel.create({
    token,
  });

  res.clearCookie("token");

  return sendResponse(res, 200, "User logout");
});

/**
 *
 * @Route GET/ api/user/
 */

const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return sendResponse(res, 401, "Unauthorized");
  }

  const user = await userModel
    .findById(req.user.id)
    .select("_id userName email profileImage role isVerified isActive");

  return sendResponse(res, 200, "use get succefulle fetchd", user);
});

const userController = { userRegister, userLogin, userLogout, getMe };

export default userController;
