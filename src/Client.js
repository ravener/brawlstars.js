const ladybug = require("ladybug-fetch");
const Band = require("./structures/Band");
const Player = require("./structures/Player");
const { clean, validate } = require("./utils");

/**
 * Represents a client interacting with the API.
 * @constructor
 * @param {any} [options] Optional object of options
 * @param {String} options.token - The Authorization token to use.
 */
class Client {
  constructor(options = {}) {
    if(!options.token) throw new Error("Missing Authorization Token.");

    /**
     * The token used for requests.
     * @type {String}
     * @private
     */
    Object.defineProperty(this, "token", { value: options.token });
  }

  _get(endpoint) {
    return ladybug(`https://brawlapi.cf/api/${endpoint}`)
      .set("Authorization", this.token)
      .then((res) => res.body);
  }

  /**
   * Gets a list of all endpoints in the api
   * @returns {Promise<Array<string>>} Array of endpoints
   */
  getEndpoints() {
    return this._get("").then((res) => res.data.endpoints);
  }

  /**
   * Gets a player by tag.
   * @param {String} tag - The tag to request.
   * @returns {Promise<Player>} The Requested Player
   */
  getPlayer(tag) {
    if(!validate(tag)) return Promise.reject(new Error("Invalid Tag."));
    return this._get(`players/${clean(tag)}`)
      .then((res) => new Player(this, res));
  }

  /**
   * Gets a band by tag.
   * @param {String} tag - The tag to request.
   * @returns {Promise<Band>} The Requested Band
   */
  getBand(tag) {
    if(!validate(tag)) return Promise.reject(new Error("Invalid Tag."));
    return this._get(`bands/${clean(tag)}`)
      .then((res) => new Band(this, res));
  }

  /**
   * Returns some info about the API.
   * @returns {Promise<any>} Info
   */
  about() {
    return this._get("about");
  }

  /**
   * Gets top players
   * @param {Number} [limit=null] - Limit of players to return, leave empty for all.
   * @returns {Promise<Array<Player>>} The Top Players
   */
  getTopPlayers(limit = null) {
    if(limit && isNaN(limit)) return Promise.reject(new TypeError("Limit must be a number."));
    return this._get(`/leaderboards/players${limit ? `/${limit}` : ""}`)
      .then((res) => res.players.map((player) => new Player(this, player)));
  }

  /**
   * Returns top bands.
   * @param {Number} [limit=null] - Limit of bands to fetch, leave empty for all.
   * @returns {Promise<Array<Band>>} The Top Bands
   */
  getTopBands(limit = null) {
    if(limit && isNaN(limit)) return Promise.reject(new TypeError("Limit must be a number."));
    return this._get(`/leaderboards/bands${limit ? `/${limit}` : ""}`)
      .then((res) => res.bands.map((band) => new Band(this, band)));
  }

  _events(type) {
    return this._get(`events${type ? `/${type}` : ""}`);
  }

  /**
   * Gets upcoming events.
   * @returns {Promise<any>} The Events Data
   */
  getUpcomingEvents() {
    return this._events();
  }

  /**
   * Gets the current events.
   * @returns {Promise<any>} The Events Data
   */
  getCurrentEvents() {
    return this._events("current");
  }
}

module.exports = Client;
