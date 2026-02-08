import { model, Schema } from "mongoose";

export interface Todo {
  _id: string;
  name: string;
  description: string;
  dueAt: Date;
  completed: boolean;
  notified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodoDocument extends Todo { }

export const TodoSchema = new Schema<ITodoDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueAt: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    notified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export const TodoModel = model<ITodoDocument>("Todo", TodoSchema);
