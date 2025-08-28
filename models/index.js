"use strict";

const fs = require("fs");
const path = require("path");

fs.readdirSync(__dirname).forEach((file) => {
  // skip index.js
  if (file === "index.js") return;

  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(path.join(__dirname, file));
  }
});
