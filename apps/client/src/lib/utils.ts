import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isPast } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showNotification = (title: string) => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Waktu Selesai!", {
      body: `Waktu task untuk ${title} sudah selesai!`,
      icon: "/favicon.ico",
    });
  }
  const audio = new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuByPLTgjMGHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGAg+mdjywnIlBSl+yPDZjTkHHm7A7+OZSA0PVqzn77BdGA==",
  );
  audio.play().catch((e) => console.log("Audio play failed:", e));
};

// export const formatTime = (seconds: number) => {
//   const hrs = Math.floor(seconds / 3600);
//   const mins = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;

//   if (hrs > 0) {
//     return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   }
//   return `${mins}:${secs.toString().padStart(2, "0")}`;
// };

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
