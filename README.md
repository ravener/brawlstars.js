# Brawl Stars
Unofficial API wrapper for the Official [Brawl Stars API](https://developer.brawlstars.com).

This package implements all the API and is written in TypeScript for safety and full typings support.

**Note:** This library got a major rewrite to v2 and is not backward compatible anymore, the previous version for Starlist API which is now discontinued and so the v2 is made with TypeScript and uses the official API.

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
```

## License
[MIT License](LICENSE)
