import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteSvgr from "vite-plugin-svgr";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), viteSvgr()],
    server: {
      port: 3000,
      // open: true,
      hmr: true,
      cors: true,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: env.API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    preview: {
      port: 3000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "/src/app/styles/helpers/index.scss" as *;
            @use "/src/app/styles/base/variables.scss" as *;
          `
        }
      }
    },
    resolve: {
      alias: {
        "@/app": resolve(__dirname, "./src/app/"),
        "@/pages": resolve(__dirname, "./src/pages/"),
        "@/widgets": resolve(__dirname, "./src/widgets/"),
        "@/features": resolve(__dirname, "./src/features/"),
        "@/entity": resolve(__dirname, "./src/entity/"),
        "@/shared": resolve(__dirname, "./src/shared/"),
        "@/libs": resolve(__dirname, "./src/libs/"),
      },
    },
  };
});
