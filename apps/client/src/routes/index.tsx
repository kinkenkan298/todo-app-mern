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
  FieldError,
  FieldLabel,
  FieldDescription,
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
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircleIcon, PlusIcon, TimerIcon, XCircle } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

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
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
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
                    required
                  />
                  <FieldDescription>
                    Masukan waktu dalam detik menit
                  </FieldDescription>
                  <FieldError match="valueMissing">Masukan Waktu</FieldError>
                </Field>
                <Button type="submit">
                  <PlusIcon />
                  Tambah
                </Button>
              </Fieldset>
            </Form>
          </CardBody>
        </Card>
      </div>
      <div>
        <Stack>
          <Item>
            <ItemContent>
              <ItemTitle>Belanja Harian</ItemTitle>
              <ItemDescription>
                Belanja kebutuhan untuk acara pernikahan.
              </ItemDescription>

              <Badge variant="secondary-outline">
                <TimerIcon />
                Sisa waktu: 20 Jam
              </Badge>
            </ItemContent>
            <ItemAction>
              <IconBox variant="success-subtle">
                <CheckCircleIcon />
              </IconBox>
              <IconBox variant="danger-subtle">
                <XCircle />
              </IconBox>
            </ItemAction>
          </Item>
          <Item>
            <ItemContent>
              <ItemTitle className="line-through text-muted">
                Belanja Harian
              </ItemTitle>
              <ItemDescription className="line-through text-muted">
                Belanja kebutuhan untuk acara pernikahan.
              </ItemDescription>
            </ItemContent>
            <ItemAction>
              <IconBox variant="danger-subtle">
                <XCircle />
              </IconBox>
            </ItemAction>
          </Item>
        </Stack>
      </div>
    </div>
  );
}
