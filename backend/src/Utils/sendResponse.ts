import type { Response } from "express";

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null = null,
  meta: Record<string, any> = {},
) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    ...meta,
  });
};

export default sendResponse;
