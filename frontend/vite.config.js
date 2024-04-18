import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from .env file
const result = dotenv.config({
  path: `${process.cwd()}/../backend/.env`,
});

if (result.error) {
  throw result.error;
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${process.env.PORT || 3000}`,
    },
  },
});
