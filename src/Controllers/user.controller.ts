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
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, 201, "User registerd successfully", newUser, {
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

  return sendResponse(res, 200, "Login success", user);
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

  res.clearCookie(token);
  return sendResponse(res, 200, "User logout");
});

/**
 *
 * @Route GET/ api/user/
 */

const getMe = asyncHandler(async (req: Request, res: Response) => {});

const userController = { userRegister, userLogin, userLogout };

export default userController;
