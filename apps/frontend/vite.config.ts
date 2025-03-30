import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    // Expose ENV variables to the client
    define: {
      "process.env.VITE_BACKEND_BASE_URL": JSON.stringify(
        env.VITE_BACKEND_BASE_URL
      ),
    },
  };
});
