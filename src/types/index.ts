import { NS } from '@ns';

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
