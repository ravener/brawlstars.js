
export interface ClubMember {
  tag: string;
  name: string;
  trophies: number;
  role: string;
  nameColor: string;
}

export interface Club {
  tag: string;
  name: string;
  description: string;
  type: string;
  requiredTrophies: number;
  trophies: number;
  members: ClubMember[];
}

export interface RankingsClub {
  tag: string;
  name: string;
  trophies: number;
  rank: number;
  memberCount: number;
}
