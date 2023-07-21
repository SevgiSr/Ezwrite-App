const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  try {
    app.use(
      createProxyMiddleware("/api", {
        target: "http://localhost:5000",
        changeOrigin: true,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
