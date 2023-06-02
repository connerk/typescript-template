import { NS, Player as NSPlayer } from '@ns';

export type ServerMap = {
  servers: {
    [hostname: string]: Server;
  };
  lastUpdate: number;
};

export type Server = {
  host: string;
  ports: number;
  hackingLevel: number;
  maxMoney: number;
  growth: number;
  minSecurityLevel: number;
  baseSecurityLevel: number;
  ram: number;
  connections: string[];
  parent: string;
  children: string[];
  files: string[];
};

export type Servers = {
  [hostname: string]: Server;
};

export interface Player extends NSPlayer {
  has4SDataTixApi?: boolean;
  hasTixApiAccess?: boolean;
  has4SDataStockMarket?: boolean;
}

export interface NSA extends NS {
  heart: {
    break(): number;
  };
  openDevMenu(): void;
  exploit(): void;
  bypass(doc: Document): void;
  alterReality(): void;
  rainbow(guess: string): void;
  iKnowWhatImDoing(): void;
}
