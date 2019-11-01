# BrawlStars
Node.js API Wrapper for [BrawlAPI](https://api-docs.starlist.pro)

## Install
```sh
npm install brawlstars --save
```

## Usage
```js
const BrawlStars = require("brawlstars");
// get token from https://discord.me/BrawlAPI
const client = new BrawlStars.Client({ token: "token" });

async function main() {
  const player = await client.getPlayer("#C2L0");
  console.log(player);
}

main();
```
Documentation can be found [here](https://brawlstars.itsladybug.ml)

## License
MIT
