
export interface StarPower {
  name: string;
  id: number;
}

export interface Brawler {
  name: string;
  id: number;
  starPowers: StarPower[];
}
