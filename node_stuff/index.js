const fs = require("fs");

console.log("start reading");

fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});

console.log("finish reading");
