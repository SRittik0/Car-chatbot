export default defineConfig({
  server: {
    proxy: {
      "/server": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
});
