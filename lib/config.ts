export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  // supports Vite-style var if present in environment
  (process.env as any).VITE_API_URL ||
  ""
