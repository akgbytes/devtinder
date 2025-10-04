export const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
export const fallbackAvatarUrl = (name: string) =>
  `https://avatar.vercel.sh/${name}`;
