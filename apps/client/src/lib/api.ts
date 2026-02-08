const API_BASE_URL = "http://localhost:3001/api";

export interface Todo {
  _id: string;
  name: string;
  description: string;
  dueAt: string;
  completed: boolean;
  notified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  name: string;
  description: string;
  timerMinutes: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const todoApi = {
  async getAll(): Promise<Todo[]> {
    const res = await fetch(`${API_BASE_URL}/todos`);
    const json: ApiResponse<Todo[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async create(input: CreateTodoInput): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json: ApiResponse<Todo> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async delete(id: string): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    const json: ApiResponse<Todo> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async complete(id: string): Promise<Todo> {
    const res = await fetch(`${API_BASE_URL}/todos/${id}/complete`, {
      method: "PATCH",
    });
    const json: ApiResponse<Todo> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },

  async getDue(): Promise<Todo[]> {
    const res = await fetch(`${API_BASE_URL}/todos/due`);
    const json: ApiResponse<Todo[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
  },
};
