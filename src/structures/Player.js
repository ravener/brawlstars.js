
/**
 * Represents a player
 * The player properties are not documented for now but they follow the API's JSON.
 * print the player to inspect the properties.
 * An example JSON response can be found <a href="https://mahi-uddin.github.io/BrawlAPI/json/players_Y2QPGG.json">here</a>.
 */
class Player {
  constructor(client, data) {

    /**
     * The client that was used to get this player.
     * @type {Client}
     */
    this.client = client;

    for(const [k, v] of Object.entries(data)) this[k] = v;
  }

  /**
   * Gets the player's club if any, returns null if not in a band.
   * @returns {Promise<?Band>}
   */
  getClub() {
    if(!this.band || !this.band.tag) return Promise.resolve(null);
    return this.client.getBand(this.band.tag);
  }

  /**
   * JSON representation of the player.
   * This is used by <pre><code>JSON.stringify()</code></pre>
   */
  toJSON() {
    const props = {};
    for(const [k, v] of Object.entries(this)) {
      if(k === "client") continue;
      props[k] = v;
    }
    return props;
  }
}

module.exports = Player;
