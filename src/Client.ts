import { Player, PlayerBattlelog, PowerPlaySeason, RankingsPlayer } from "./Player";
import { Brawler } from "./Brawler";
import { Club, ClubMember, RankingsClub } from "./Club";
import Cache, { Options } from "node-cache";
import { request } from "undici";
import { cleanTag } from "./utils";
import { stringify } from "querystring";
import { STATUS_CODES } from "http";
import { ScheduledEvent } from "./Event";

export interface ClientOptions {
  cache: boolean;
  cacheOptions?: Options;
}

export class APIError extends Error {
  public status: number;

  public constructor(text: string, status: number) {
    super(text);
    this.status = status;
  }
}

export class Client {
  public token: string;
  public cache?: Cache;
  public baseURL: string = "https://api.brawlstars.com/v1";

  public constructor(token: string, options: ClientOptions = { cache: true }) {
    this.token = token;
    this.cache = options.cache ? new Cache(options.cacheOptions) : undefined;
  }

  /**
   * Returns the bearer value for authorization header.
   * @returns {String}
   */
  public get authorization(): string {
    return `Bearer ${this.token}`;
  }

  private async _fetch<T>(path: string, query?: any): Promise<T> {
    const url = this.baseURL + path + (query ? "?" + stringify(query) : "");

    const exists = this.cache?.get<T>(url);
    if (exists) return exists;

    const response = await request(url, {
      headers: {
        "authorization": this.authorization,
        "user-agent": "brawlstars.js https://github.com/ravener/brawlstars.js",
        "accept": "application/json"
      }
    });

    if (response.statusCode !== 200) {
      throw new APIError(STATUS_CODES[response.statusCode]!, response.statusCode);
    }

    const data = await response.body.json();
    const cache = response.headers["cache-control"];
    const ttl = cache && cache.startsWith("max-age=") ? parseInt(cache.slice(8)) : 0;

    if (ttl) this.cache?.set(url, data, ttl);

    return data;
  }

  public getPlayer(tag: string): Promise<Player> {
    return this._fetch<Player>(`/players/%23${cleanTag(tag)}`)
      .then((res) => {
        // Thanks a lot supercell.
        res.x3vs3Victories = (res as any)["3vs3Victories"];
        return res;
      });
  }

  public getPlayerBattlelog(tag: string): Promise<PlayerBattlelog[]> {
    return this._fetch<PlayerBattlelog[]>(`/players/%23${cleanTag(tag)}/battlelog`);
  }

  public getClub(tag: string): Promise<Club> {
    return this._fetch<Club>(`/clubs/%23${cleanTag(tag)}`);
  }

  public getPlayerRankings(country: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<RankingsPlayer[]> {
    const query: any = {};

    if (before) query.before = before;
    if (after) query.after = after;
    if (limit) query.limit = limit;

    return this._fetch<RankingsPlayer[]>(`/rankings/${country}/players`, query);
  }

  public getClubRankings(country: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<RankingsClub[]> {
    const query: any = {};

    if (before) query.before = before;
    if (after) query.after = after;
    if (limit) query.limit = limit;

    return this._fetch<RankingsClub[]>(`/rankings/${country}/clubs`, query);
  }

  public getBrawlerRankings(country: string, brawler: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<RankingsPlayer[]> {
    const query: any = {};

    if (before) query.before = before;
    if (after) query.after = after;
    if (limit) query.limit = limit;

    return this._fetch<RankingsPlayer[]>(`/rankings/${country}/brawlers/${brawler}`, query);
  }

  public getPowerPlayRankings(country: string, seasonId: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<RankingsPlayer[]> {
    const query: any = {};

    if (before) query.before = before;
    if (after) query.after = after;
    if (limit) query.limit = limit;

    return this._fetch<RankingsPlayer[]>(`/rankings/${country}/powerplay/seasons/${seasonId}`, query);
  }

  public getPowerPlaySeasons(country: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<PowerPlaySeason[]> {
    const query: any = {};

    if (before) query.before = before;
    if (after) query.after = after;
    if (limit) query.limit = limit;

    return this._fetch<PowerPlaySeason[]>(`/rankings/${country}/powerplay/seasons`, query);
  }

  public getClubMembers(tag: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<ClubMember[]> {
    const query: any = {};

    if (before) query.before = before;
    if (after) query.after = after;
    if (limit) query.limit = limit;

    return this._fetch<ClubMember[]>(`/clubs/%23${cleanTag(tag)}/members`, query);
  }

  public getBrawlers({ before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<Brawler[]> {
    const query: any = {};

    if (before) query.before = before;
    if (after) query.after = after;
    if (limit) query.limit = limit;

    return this._fetch<Brawler[]>(`/brawlers`, query);
  }

  public getBrawler(id: string) {
    return this._fetch<Brawler>(`/brawlers/${id}`);
  }

  public getEvents() {
    return this._fetch<ScheduledEvent[]>("/events/rotation");
  }
}
