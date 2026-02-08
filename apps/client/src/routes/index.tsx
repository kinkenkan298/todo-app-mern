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
import { Input } from "@/components/selia/input";
import { Stack } from "@/components/selia/stack";
import { Textarea } from "@/components/selia/textarea";
import { TodoItem } from "@/components/todo-item";
import {
  showNotification,
  useCompleteTodo,
  useCreateTodo,
  useDeleteTodo,
  useDueTodos,
  useTodos,
} from "@/lib/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: todos, isLoading: isTodosLoading } = useTodos();
  const { data: dueTodos } = useDueTodos();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const completeTodo = useCompleteTodo();

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

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
