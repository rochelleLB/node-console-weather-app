const weather = require("./weather");
const userInput = process.argv.slice(2).join(" ");
weather.get(userInput);
