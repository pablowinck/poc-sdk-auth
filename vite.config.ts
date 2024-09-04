// @ts-ignore
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts"; // Plugin para gerar declarações de tipo

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    lib: {
      // @ts-ignore
      entry: path.resolve(__dirname, "src/index.ts"), // caminho do arquivo de entrada principal
      name: "MfaSdk", // nome da biblioteca
      fileName: (format) => `mfa-sdk.${format}.js`, // nome do arquivo de saída
      formats: ["es", "umd"], // formatos de build: ES Module e UMD
    },
    outDir: "dist", // diretório de saída
    minify: "esbuild",
  },
  resolve: {
    alias: {
      // @ts-ignore
      "@": path.resolve(__dirname, "src"), // alias para o diretório src
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true, // Cria uma entrada de tipo no package.json
      outDir: "dist/types", // Diretório de saída para os tipos gerados
    }),
  ],
});
