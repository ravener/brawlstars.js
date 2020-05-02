import { Player, PlayerBattlelog, RankingsPlayer } from "./Player";
import { Brawler } from "./Brawler";
import { Club, ClubMember, RankingsClub } from "./Club";
import Cache, { Options } from "node-cache";
import fetch, { Response } from "node-fetch";
import { cleanTag } from "./utils";
import { stringify } from "querystring";

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
    if(exists) return exists;

    const response = await fetch(url, {
      headers: {
        "Authorization": this.authorization,
        "User-Agent": "BrawlStars.js https://github.com/pollen5/brawlstars.js",
        "Accept": "application/json"
      }
    });

    if(!response.ok) throw new APIError(response.statusText, response.status);

    const data = await response.json();
    const cache = response.headers.get("cache-control");
    const ttl = cache && cache.startsWith("max-age=") ? parseInt(cache.slice(8)) : 0;

    if(ttl) this.cache?.set(url, data, ttl);

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
    if(before) query.before = before;
    if(after) query.after = after;
    if(limit) query.limit = limit;

    return this._fetch<RankingsPlayer[]>(`/rankings/${country}/players`, query);
  }

  public getClubRankings(country: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<RankingsClub[]> {
    const query: any = {};
    if(before) query.before = before;
    if(after) query.after = after;
    if(limit) query.limit = limit;

    return this._fetch<RankingsClub[]>(`/rankings/${country}/clubs`, query);
  }

  public getBrawlerRankings(country: string, brawler: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<RankingsPlayer[]> {
    const query: any = {};
    if(before) query.before = before;
    if(after) query.after = after;
    if(limit) query.limit = limit;

    return this._fetch<RankingsPlayer[]>(`/rankings/${country}/brawlers/${brawler}`, query);
  }

  public getClubMembers(tag: string, { before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<ClubMember[]> {
    const query: any = {};
    if(before) query.before = before;
    if(after) query.after = after;
    if(limit) query.limit = limit;

    return this._fetch<ClubMember[]>(`/clubs/%23${cleanTag(tag)}/members`, query);
  }

  public getBrawlers({ before, after, limit }: { before?: string, after?: string, limit?: number } = {}): Promise<Brawler[]> {
    const query: any = {};
    if(before) query.before = before;
    if(after) query.after = after;
    if(limit) query.limit = limit;

    return this._fetch<Brawler[]>(`/brawlers`, query);
  }

  public getBrawler(id: string) {
    return this._fetch<Brawler>(`/brawlers/${id}`);
  }
}
