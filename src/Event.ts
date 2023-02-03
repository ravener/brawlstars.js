export type EventMode = "soloShowdown" | "duoShowdown" | "heist" | "bounty" | 
                        "siege" | "gemGrab" | "brawlBall" | "bigGame" | "bossFight" |
                        "roboRumble" | "takedown" | "loneStar" | "presentPlunder" |
                        "hotZone" | "superCityRampage" | "knockout" | "volleyBrawl" |
                        "basketBrawl" | "holdTheTrophy" | "trophyThieves" | "duels" |
                        "wipeout" | "payload" | "botDrop" | "hunters" | "lastStand" |
                        "snowtelThieves" | "unknown";

export type EventModifier = "unknown" | "none" | "energyDrink" | "angryRobo" |
                            "meteorShower" | "graveyardShift" | "healingMushrooms" |
                            "bossFightRockets" | "takedownLasers" | "takedownChainLightning" |
                            "takedownRockets" | "waves" | "hauntedBall" | "superCharge" | 
                            "fastBrawlers" | "showdown+" | "peekABoo" | "burningBall";

export interface ScheduledEventLocation {
  mode: EventMode;
  modifiers: EventModifier[];
  id: number;
  map: string;
}

export interface ScheduledEvent {
  event: ScheduledEventLocation;
  slotId: number;
  startTime: string;
  endTime: string;
}