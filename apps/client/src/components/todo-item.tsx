import type { Todo } from "@/lib/api";
import { formatTimeRemaining } from "@/lib/utils";
import { CheckCircleIcon, Loader2Icon, TimerIcon, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./selia/badge";
import { IconBox } from "./selia/icon-box";
import {
  Item,
  ItemAction,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./selia/item";

export const TodoItem = ({
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
}) => {
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
};
