import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCode (lenght = 6) {
  const code = Array.from({ length: lenght }, () => Math.floor(Math.random() * 10)).join('')
  return code;
}

export function isNumber (value: number) {
  return typeof value === 'number' && !Number.isNaN(value);
}