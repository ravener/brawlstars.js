
export interface StarPower {
  name: string;
  id: number;
}

export interface Gadget {
  name: string;
  id: number;
}

export interface Gear {
  name: string;
  id: number;
  level: number;
}

export interface Brawler {
  name: string;
  id: number;
  gadgets: Gadget[];
  starPowers: StarPower[];
}
