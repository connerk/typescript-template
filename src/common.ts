import { NS } from '@ns';

export const settings = {
  minSecurityLevelOffset: 2,
  maxMoneyMultiplayer: 0.9,
  minSecurityWeight: 100,
  maxHacknetNodes: 30,
  mapRefreshInterval: 24 * 60 * 60 * 1000,
  playerServers: {
    PLAYER_SERVER_PREFIX: 'pserv-',
    maxPlayerServers: 25,
    gbRamCost: 55000,
    maxGbRam: 1048576,
    minGbRam: 64,
    totalMoneyAllocation: 0.9,
    actions: {
      BUY: 'buy',
      UPGRADE: 'upgrade',
    },
  },
  keys: {
    serverMap: 'BB_SERVER_MAP',
    hackTarget: 'BB_HACK_TARGET',
    action: 'BB_ACTION',
  },
  delay: 5000,
  reserveMoney: 0,
  ascendThreshold: 1.1,
  corporation: {
    ENERGY_THRESHOLD: 0.9,
    MORALE_THRESHOLD: 0.9,
  },
  homeRamReserved: 32,
  homeRamReservedBase: 32,
  homeRamExtraRamReserved: 12,
  homeRamBigMode: 64,
  maxWeakenTime: 30 * 60 * 1000,
  delayAdditionalMS: 200,
  changes: {
    hack: 0.002,
    grow: 0.004,
    weaken: 0.05,
  },
};

export const hackPrograms = [
  'BruteSSH.exe',
  'FTPCrack.exe',
  'relaySMTP.exe',
  'HTTPWorm.exe',
  'SQLInject.exe',
];

export const allFactions = [
  'Illuminati',
  'Daedalus',
  'The Covenant',
  'ECorp',
  'MegaCorp',
  'Bachman & Associates',
  'Blade Industries',
  'NWO',
  'Clarke Incorporated',
  'OmniTek Incorporated',
  'Four Sigma',
  'KuaiGong International',
  'Fulcrum Secret Technologies',
  'BitRunners',
  'The Black Hand',
  'NiteSec',
  'Aevum',
  'Chongqing',
  'Ishima',
  'New Tokyo',
  'Sector-12',
  'Volhaven',
  'Speakers for the Dead',
  'The Dark Army',
  'The Syndicate',
  'Silhouette',
  'Tetrads',
  'Slum Snakes',
  'Netburners',
  'Tian Di Hui',
  'CyberSec',
  'Bladeburners',
  'Church of the Machine God',
  'Shadows of Anarchy',
];

export function getPlayerDetails(ns: NS) {
  let portHacks = 0;

  hackPrograms.forEach((hackProgram) => {
    if (ns.fileExists(hackProgram, 'home')) {
      portHacks += 1;
    }
  });

  return {
    hackingLevel: ns.getHackingLevel(),
    portHacks,
  };
}

export function getItem(key: string) {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : undefined;
}

export function setItem(key: string, value: string | number | object) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime();
  }

  return new Date(ms).toLocaleTimeString();
}

export function createUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
