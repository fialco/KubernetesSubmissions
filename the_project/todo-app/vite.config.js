import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// localhost used for local development with .env file
const PORT = process.env.PORT || 3000;
const baseUrl = process.env.URL || "http://localhost";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `${baseUrl}:${PORT}`,
        changeOrigin: true,
      },
    },
  },
});
