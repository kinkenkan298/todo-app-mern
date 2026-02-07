import type { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/http-exception";
import { errorResponse, MessageType } from "../utils/api-response";

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpException) {
    errorResponse({
      res,
      message: err.message,
      statusCode: err.status,
      data: null,
      type: MessageType.ERROR,
    });
    return;
  }
  errorResponse({
    res,
    message: "Internal Server Error",
    statusCode: 500,
    data: null,
    type: MessageType.ERROR,
  });
};
