const path = require("path");

module.exports = {
  node: "development",
  node: {
    __dirname: false,
    __filename: false,
    global: true,
  },
  entry: {
    mapa: "./js/mapa.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("public/js"),
  },
};
