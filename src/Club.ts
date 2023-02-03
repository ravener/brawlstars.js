import { PlayerIcon } from "./Player";

export type ClubMemberRole = "notMember" | "member" | "president" | "senior" | "vicePresident" | "unknown";
export type ClubType = "open" | "inviteOnly" | "closed" | "unknown";

export interface ClubMember {
  tag: string;
  name: string;
  icon: PlayerIcon;
  trophies: number;
  role: ClubMemberRole;
  nameColor: string;
}

export interface Club {
  tag: string;
  name: string;
  description: string;
  requiredTrophies: number;
  trophies: number;
  members: ClubMember[];
  type: ClubType;
  badgeId: number;
}

export interface RankingsClub {
  tag: string;
  name: string;
  trophies: number;
  rank: number;
  memberCount: number;
  badgeId: number;
}
