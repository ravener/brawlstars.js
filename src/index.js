/* eslint-disable global-require */
module.exports = {
  Client: require("./Client.js"),
  utils: require("./utils"),
  Player: require("./structures/Player.js"),
  Club: require("./structures/Club.js"),
  version: require("../package.json").version
};
