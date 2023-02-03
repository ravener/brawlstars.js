# Brawl Stars
![GitHub repo size](https://img.shields.io/github/repo-size/ravener/brawlstars.js)
![GitHub](https://img.shields.io/github/license/ravener/brawlstars.js)
[![Discord](https://discordapp.com/api/guilds/397479560876261377/embed.png)](https://discord.gg/mDkMbEh)

Unofficial API wrapper for the Official [Brawl Stars API](https://developer.brawlstars.com).

This package implements all the API and is written in TypeScript for safety and full typings support.

## Install
```sh
$ npm install brawlstars
```
TypeScript typings included in the installation.

## Usage
Simply import the `Client` class and instantiate it with your API token:
```js
// TypeScript, ESM
import { Client } from "brawlstars";

// CommonJS, Node.js
const { Client } = require("brawlstars");

// Create instance
const client = new Client("TOKEN", { 
  cache: true, // default is true
  cacheOptions: undefined /* options for node-cache, default is undefined. */
});

// Call into functions
client.getPlayer("TAG")
  .then((player) => console.log(player.name))
  .catch((err) => console.error(err));
```
All functions return a Promise. Tags are cleaned before use (Removes `#` and replaces letter `O` with zero `0`)

All results are cached when supercell sends `cache-control` in the response, in that case the objects are in cache until the `max-age` expires. Caching can be disabled and options can be passed to the underlying `node-cache` library.

## License
BrawlStars Wrapper is released under the [MIT License](LICENSE)

This is an unofficial wrapper and I do not own the name Brawl Stars in any way.
