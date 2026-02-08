import { TodoModel, type Todo } from "@/models/TodoModel";

interface CreateTodoInput {
  name: string;
  description: string;
  timerMinutes: number;
}

interface UpdateTodoInput {
  name?: string;
  description?: string;
  dueAt?: Date;
  completed?: boolean;
}

export const todoService = {
  async createTodo(data: CreateTodoInput): Promise<Todo> {
    const dueAt = new Date(Date.now() + data.timerMinutes * 60 * 1000);
    const todo = new TodoModel({
      name: data.name,
      description: data.description,
      dueAt,
    });
    return await todo.save();
  },

  async getAllTodos(): Promise<Todo[]> {
    return await TodoModel.find().sort({ createdAt: -1 });
  },

  async getTodoById(id: string): Promise<Todo | null> {
    return await TodoModel.findById(id);
  },

  async updateTodo(id: string, data: UpdateTodoInput): Promise<Todo | null> {
    return await TodoModel.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteTodo(id: string): Promise<Todo | null> {
    return await TodoModel.findByIdAndDelete(id);
  },

  async markAsCompleted(id: string): Promise<Todo | null> {
    return await TodoModel.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true },
    );
  },

  async getDueTodos(): Promise<Todo[]> {
    const now = new Date();
    return await TodoModel.find({
      dueAt: { $lte: now },
      notified: false,
      completed: false,
    });
  },

  async markAsNotified(ids: string[]): Promise<void> {
    await TodoModel.updateMany({ _id: { $in: ids } }, { notified: true });
  },
};
