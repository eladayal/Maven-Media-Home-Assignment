const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/Maven-Media-Home-Assignment/" : "/",
  transpileDependencies: true,
});
