import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendorReact: ["react", "react-dom", "react-router-dom"],
          vendorRedux: ["@reduxjs/toolkit", "react-redux"],
          vendorFirebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
        },
      },
    },
  },
});
