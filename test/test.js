/* eslint-env mocha */

const chai = require("chai");
const { expect } = chai;
const BrawlStars = require("..");
const token = process.env.TOKEN;

if(!token) {
  // eslint-disable-next-line no-console
  console.error("Token wasn't found in environment variables, tests can't continue");
  process.exit(1);
}

describe("Client", () => {
  it("Should throw on missing token", () => {
    expect(() => new BrawlStars.Client()).to.throw();
  });
  it("Should return an array of endpoints", async() => {
    const client = new BrawlStars.Client({ token });
    return expect(await client.getEndpoints()).to.be.an("array");
  });
  it("Should get a player", async() => {
    const client = new BrawlStars.Client({ token });
    const player = await client.getPlayer("#C2L0");
    expect(player).to.exist;
    expect(player).to.be.an.instanceof(BrawlStars.Player);
  });
  it("Should get a band", async() => {
    const client = new BrawlStars.Client({ token });
    const band = await client.getBand("#LQL");
    expect(band).to.exist;
    expect(band).to.be.an.instanceof(BrawlStars.Band);
  });

  it("Should get the about file", async() => {
    const client = new BrawlStars.Client({ token });
    const about = await client.about();
    expect(about).to.exist;
    expect(about).to.be.an("object");
    expect(about).to.not.be.empty;
  });
  // TODO more tests.
});
