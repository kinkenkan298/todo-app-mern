import type { Response } from "express";

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}
export interface APIResponse<T = unknown> {
  res: Response;
  success?: boolean;
  message?: string;
  errors?: string[];
  data: T;
  statusCode: number;
  type?: MessageType;
}

const successResponse = <T>({
  res,
  message,
  data,
  success = true,
  statusCode = 200,
  type = MessageType.SUCCESS,
}: APIResponse<T>): Response => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    type,
  } as APIResponse<T>);
};
const errorResponse = <T>({
  res,
  message,
  data,
  errors,
  statusCode = 500,
  type = MessageType.ERROR,
}: APIResponse<T>) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    data,
    type,
  } as APIResponse<T>);
};

export { errorResponse, successResponse };
