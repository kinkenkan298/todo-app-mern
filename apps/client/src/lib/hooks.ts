import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoApi, type CreateTodoInput, type Todo } from "./api";

export const TODOS_QUERY_KEY = ["todos"] as const;
export const DUE_TODOS_QUERY_KEY = ["todos", "due"] as const;

export function useTodos() {
  return useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: todoApi.getAll,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTodoInput) => todoApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useCompleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoApi.complete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useDueTodos(enabled: boolean = true) {
  return useQuery({
    queryKey: DUE_TODOS_QUERY_KEY,
    queryFn: todoApi.getDue,
    enabled,
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: true,
  });
}

export function showNotification(todo: Todo) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(`⏰ Waktu habis: ${todo.name}`, {
      body: todo.description,
      icon: "/favicon.ico",
    });
  }
  const audio = new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuByPLTgjMGHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGA==",
  );
  audio.play().catch((e) => console.log("Audio play failed:", e));
}
