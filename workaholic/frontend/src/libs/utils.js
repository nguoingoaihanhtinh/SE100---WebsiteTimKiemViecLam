import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
}
export function formatDate(dateString) {
  const date = new Date(dateString); // Convert ISO string to Date object

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${String(day).padStart(
    2,
    "0"
  )}/${String(month).padStart(2, "0")}/${year}`;
}
