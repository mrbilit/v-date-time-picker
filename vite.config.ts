import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VDateTimePicker",
      fileName: (format) => `v-date-time-picker.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "dayjs", "jalali-plugin-dayjs"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          dayjs: "dayjs",
          'jalali-plugin-dayjs': "jalali-plugin-dayjs",
        },
      },
    },
  },
});
