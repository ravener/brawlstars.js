# Brawl Stars

[![Discord](https://discordapp.com/api/guilds/397479560876261377/embed.png)](https://discord.gg/mDkMbEh)

Unofficial API wrapper for the Official [Brawl Stars API](https://developer.brawlstars.com).

This package implements all the API and is written in TypeScript for safety and full typings support.

**Note:** This library got a major rewrite to v2 and is not backward compatible anymore, the previous version was for Starlist API which is now discontinued and so the v2 is made with TypeScript and uses the official API.

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

## TypeScript
Types for responses are exposed for easy TypeScript usage and safety.
```ts
import { Client, Player } from "brawlstars";

const client = new Client(...);

client.getPlayer("TAG")
  .then((player: Player) => {
    // Access player fields.
  });
```
## Getting Support
Best way to contact me is through my [Discord Server](https://discord.gg/mDkMbEh). You can also open issues for bug reports or suggestions.

## License
BrawlStars Wrapper is released under the [MIT License](LICENSE)

This is an unofficial wrapper and I do not own the name Brawl Stars in any way.
