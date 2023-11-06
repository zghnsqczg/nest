import { defineConfig, loadEnv, UserConfigExport } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import * as path from "path";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";
export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, process.cwd());
  const config: UserConfigExport = {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:4230/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    base: "./",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue(),
      WindiCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue", "vue-router", "pinia"],
        eslintrc: {
          enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: "./.eslintrc-auto-import.json", // 生成json文件
          globalsPropValue: true,
        },
        dts: "./auto-imports.d.ts",
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  };
  return config;
});
