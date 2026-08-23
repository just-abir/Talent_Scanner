import asyncHandler from "../Utils/asyncHandler.js";
import type { NextFunction, Request, Response } from "express";
import sendResponse from "../Utils/sendResponse.js";

import jwt, { type JwtPayload } from "jsonwebtoken";

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      return sendResponse(res, 401, "Authenticaiton Eroro");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    req.user = decoded;
    next();
  },
);

export default authMiddleware;
