
/**
 * Represents a Band.
 * The properties are not documented for now but they follow the API's JSON body.
 * print the Band to inspect the properties.
 */
class Band {
  constructor(client, data) {

    /**
     * The client used to request this band.
     * @type {Client}
     */
    this.client = client;

    for(const [k, v] of Object.entries(data)) this[k] = v;
  }

  /**
   * JSON Representation of this band.
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

module.exports = Band;
