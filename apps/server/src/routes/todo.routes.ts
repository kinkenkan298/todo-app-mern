import { asyncHandler } from "@/middleware/async-handler";
import type { Todo } from "@/models/TodoModel";
import { todoService } from "@/service/todo.service";
import { successResponse } from "@/utils/api-response";
import { HttpException } from "@/utils/http-exception";
import { Router, type Request, type Response } from "express";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const todos = await todoService.getAllTodos();
    successResponse({
      res,
      data: todos,
      message: "Todos retrieved successfully",
      statusCode: 200,
    });
  }),
);

router.get(
  "/due",
  asyncHandler(async (req: Request, res: Response) => {
    const todos = await todoService.getDueTodos();

    if (todos.length > 0) {
      const ids = todos.map((todo: Todo) => todo._id.toString());
      await todoService.markAsNotified(ids);
    }

    successResponse({
      res,
      data: todos,
      message: "Due todos retrieved successfully",
      statusCode: 200,
    });
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const todo = await todoService.getTodoById(req.params.id as string);
    if (!todo) {
      throw new HttpException(404, "Todo not found");
    }
    successResponse({
      res,
      data: todo,
      message: "Todo retrieved successfully",
      statusCode: 200,
    });
  }),
);

router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const { name, description, timerMinutes } = req.body;

    if (!name || !description || !timerMinutes) {
      throw new HttpException(
        400,
        "Name, description, and timerMinutes are required",
      );
    }

    const todo = await todoService.createTodo({
      name,
      description,
      timerMinutes: Number(timerMinutes),
    });

    successResponse({
      res,
      data: todo,
      message: "Todo created successfully",
      statusCode: 201,
    });
  }),
);

router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const todo = await todoService.updateTodo(
      req.params.id as string,
      req.body,
    );
    if (!todo) {
      throw new HttpException(404, "Todo not found");
    }
    successResponse({
      res,
      data: todo,
      message: "Todo updated successfully",
      statusCode: 200,
    });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const todo = await todoService.deleteTodo(req.params.id as string);
    if (!todo) {
      throw new HttpException(404, "Todo not found");
    }
    successResponse({
      res,
      data: todo,
      message: "Todo deleted successfully",
      statusCode: 200,
    });
  }),
);

router.patch(
  "/:id/complete",
  asyncHandler(async (req: Request, res: Response) => {
    const todo = await todoService.markAsCompleted(req.params.id as string);
    if (!todo) {
      throw new HttpException(404, "Todo not found");
    }
    successResponse({
      res,
      data: todo,
      message: "Todo marked as completed",
      statusCode: 200,
    });
  }),
);

export { router as todoRoutes };
