import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.VITE_WHITEBOARD_BACKEND_BASE_URL": JSON.stringify(
        env.VITE_WHITEBOARD_BACKEND_BASE_URL
      ),
      "process.env.VITE_REPO_VULGARITY_ANALYSIS_BACKEND_BASE_URL":
        JSON.stringify(env.VITE_REPO_VULGARITY_ANALYSIS_BACKEND_BASE_URL),
    },
  };
});
