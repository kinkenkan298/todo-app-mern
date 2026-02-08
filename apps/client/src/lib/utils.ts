import { clsx, type ClassValue } from "clsx";
import { isPast } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeRemaining = (dueAt: string): string => {
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
};

export const getTimeRemaining = (endTime: number) => {
  if (!endTime) return "00:00:00";

  const now = new Date();
  const end = new Date(endTime);

  if (isPast(end)) return "00:00:00";

  const diff = end.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
