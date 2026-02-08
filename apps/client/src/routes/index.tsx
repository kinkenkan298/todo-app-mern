import { Badge } from "@/components/selia/badge";
import { Button } from "@/components/selia/button";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/selia/card";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/selia/field";
import { Fieldset } from "@/components/selia/fieldset";
import { Form } from "@/components/selia/form";
import { IconBox } from "@/components/selia/icon-box";
import { Input } from "@/components/selia/input";
import {
  Item,
  ItemAction,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/selia/item";
import { Stack } from "@/components/selia/stack";
import { Textarea } from "@/components/selia/textarea";
import type { Todo } from "@/lib/api";
import {
  showNotification,
  useCompleteTodo,
  useCreateTodo,
  useDeleteTodo,
  useDueTodos,
  useTodos,
} from "@/lib/hooks";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircleIcon,
  Loader2Icon,
  PlusIcon,
  TimerIcon,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function formatTimeRemaining(dueAt: string): string {
  const now = Date.now();
  const due = new Date(dueAt).getTime();
  const diff = due - now;

  if (diff <= 0) return "Waktu habis!";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours} Jam ${minutes} Menit`;
  }
  if (minutes > 0) {
    return `${minutes} Menit ${seconds} Detik`;
  }
  return `${seconds} Detik`;
}

function TodoItem({
  todo,
  onComplete,
  onDelete,
  isDeleting,
  isCompleting,
}: {
  todo: Todo;
  onComplete: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  isCompleting: boolean;
}) {
  const [timeRemaining, setTimeRemaining] = useState(() =>
    formatTimeRemaining(todo.dueAt),
  );
  const isOverdue = new Date(todo.dueAt).getTime() <= Date.now();

  useEffect(() => {
    if (todo.completed) return;

    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(todo.dueAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [todo.dueAt, todo.completed]);

  return (
    <Item>
      <ItemContent>
        <ItemTitle
          className={todo.completed ? "line-through text-muted" : undefined}
        >
          {todo.name}
        </ItemTitle>
        <ItemDescription
          className={todo.completed ? "line-through text-muted" : undefined}
        >
          {todo.description}
        </ItemDescription>

        {!todo.completed && (
          <Badge variant={isOverdue ? "danger-outline" : "secondary-outline"}>
            <TimerIcon />
            Sisa waktu: {timeRemaining}
          </Badge>
        )}
      </ItemContent>
      <ItemAction>
        {!todo.completed && (
          <IconBox
            variant="success-subtle"
            onClick={onComplete}
            className="cursor-pointer"
          >
            {isCompleting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <CheckCircleIcon />
            )}
          </IconBox>
        )}
        <IconBox
          variant="danger-subtle"
          onClick={onDelete}
          className="cursor-pointer"
        >
          {isDeleting ? <Loader2Icon className="animate-spin" /> : <XCircle />}
        </IconBox>
      </ItemAction>
    </Item>
  );
}

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: todos, isLoading: isTodosLoading } = useTodos();
  const { data: dueTodos } = useDueTodos();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const completeTodo = useCompleteTodo();

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Show notifications for due todos
  useEffect(() => {
    if (dueTodos && dueTodos.length > 0) {
      dueTodos.forEach((todo) => {
        showNotification(todo);
      });
    }
  }, [dueTodos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("todo-name") as string;
    const description = formData.get("deskripsi") as string;
    const timerMinutes = Number(formData.get("timer"));

    createTodo.mutate(
      { name, description, timerMinutes },
      {
        onSuccess: () => {
          formRef.current?.reset();
        },
      },
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-6 grid grid-cols-2 gap-10">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Todo App</CardTitle>
            <CardDescription>
              Berfungsi untuk membuat daftar kegiatan yang perlu dilakukan.
            </CardDescription>
          </CardHeader>
          <CardBody>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Fieldset>
                <Field>
                  <FieldLabel htmlFor="todo-name">Kegiatan</FieldLabel>
                  <Input
                    type="text"
                    name="todo-name"
                    id="todo-name"
                    placeholder="Masukan Kegiatan"
                    required
                  />
                  <FieldError match="valueMissing">Masukan Kegiatan</FieldError>
                </Field>
                <Field>
                  <FieldLabel htmlFor="deskripsi">Deskripsi</FieldLabel>
                  <FieldControl
                    render={
                      <Textarea
                        name="deskripsi"
                        id="deskripsi"
                        placeholder="Masukan Deskripsi"
                        required
                      />
                    }
                  />
                  <FieldError match="valueMissing">
                    Masukan Deskripsi
                  </FieldError>
                </Field>
                <Field>
                  <FieldLabel htmlFor="timer">Waktu</FieldLabel>
                  <Input
                    type="number"
                    name="timer"
                    id="timer"
                    placeholder="Masukan waktu"
                    min="1"
                    required
                  />
                  <FieldDescription>Masukan waktu dalam menit</FieldDescription>
                  <FieldError match="valueMissing">Masukan Waktu</FieldError>
                </Field>
                <Button type="submit" disabled={createTodo.isPending}>
                  {createTodo.isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <PlusIcon />
                  )}
                  {createTodo.isPending ? "Menambahkan..." : "Tambah"}
                </Button>
              </Fieldset>
            </Form>
          </CardBody>
        </Card>
      </div>
      <div>
        {isTodosLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2Icon className="animate-spin h-8 w-8 text-muted" />
          </div>
        ) : todos && todos.length > 0 ? (
          <Stack>
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onComplete={() => completeTodo.mutate(todo._id)}
                onDelete={() => deleteTodo.mutate(todo._id)}
                isDeleting={
                  deleteTodo.isPending && deleteTodo.variables === todo._id
                }
                isCompleting={
                  completeTodo.isPending && completeTodo.variables === todo._id
                }
              />
            ))}
          </Stack>
        ) : (
          <div className="text-center py-10 text-muted">
            Belum ada kegiatan. Tambahkan kegiatan baru!
          </div>
        )}
      </div>
    </div>
  );
}
