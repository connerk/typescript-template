import { NS } from '@ns';
import { settings, localeHHMMSS, getItem } from '/common';
import { Servers } from '/types';

export const pathToServer = (
  servers: Servers,
  serverToFind: string
): string[] => {
  if (serverToFind === 'home') return ['home'];
  if (!servers[serverToFind]) return [`-- Unable to locate ${serverToFind} --`];

  const jumps = [];

  let isParentHome = false;
  let currentServer = serverToFind;

  while (!isParentHome) {
    jumps.push(servers[currentServer].parent);

    if (servers[currentServer].parent !== 'home') {
      currentServer = servers[currentServer].parent;
    } else {
      isParentHome = true;
    }
  }

  jumps.unshift(serverToFind);
  return jumps;
};

function printPathToServer(jumps: string[]): string {
  if (jumps.length === 1) return jumps[0];
  return jumps.reverse().join('; connect ');
}

export async function main(ns: NS): Promise<void> {
  ns.tprint(`[${localeHHMMSS()}] Starting find.js`);
  const serverToFind: string = ns.args[0] as string;

  const serverMap = getItem(settings.keys.serverMap);

  if (serverToFind) {
    if (Object.keys(serverMap.servers).includes(serverToFind)) {
      const jumps = pathToServer(serverMap.servers, serverToFind);
      const path = printPathToServer(jumps);
      ns.tprint(`[${localeHHMMSS()}] Path to ${serverToFind} found: \n${path}`);
      return;
    } else {
      ns.tprint(
        `[${localeHHMMSS()}] Unable to find the path to ${serverToFind}`
      );
      return;
    }
  } else {
    ns.tprint(`[${localeHHMMSS()}] Common servers:`);
    ns.tprint('* CSEC (CyberSec faction)');
    ns.tprint(
      printPathToServer(pathToServer(serverMap.servers, 'CSEC')) + '; backdoor;'
    );
    ns.tprint('');
    ns.tprint('* avmnite-02h (NiteSec faction)');
    ns.tprint(
      printPathToServer(pathToServer(serverMap.servers, 'avmnite-02h')) +
        '; backdoor;'
    );
    ns.tprint('');
    ns.tprint('* I.I.I.I (The Black Hand faction)');
    ns.tprint(
      printPathToServer(pathToServer(serverMap.servers, 'I.I.I.I')) +
        '; backdoor;'
    );
    ns.tprint('');
    ns.tprint('* run4theh111z (Bitrunners faction)');
    ns.tprint(
      printPathToServer(pathToServer(serverMap.servers, 'run4theh111z')) +
        '; backdoor;'
    );
    ns.tprint('');
    ns.tprint('* w0r1d_d43m0n');
    ns.tprint(
      printPathToServer(pathToServer(serverMap.servers, 'w0r1d_d43m0n')) +
        '; backdoor;'
    );
    ns.tprint('');
    ns.tprint(`[${localeHHMMSS()}] Looking for servers with coding contracts:`);
    Object.keys(serverMap.servers).forEach((hostname) => {
      const files = ns.ls(hostname);
      if (files && files.length) {
        const contract = files.find((file: string) => file.includes('.cct'));

        if (contract) {
          ns.tprint('');
          ns.tprint(`* ${hostname} has a coding contract(s)! Connect using:`);
          ns.tprint(
            printPathToServer(pathToServer(serverMap.servers, hostname)) +
              `; run ${contract};`
          );
        }
      }
    });
    ns.tprint('');
    ns.tprint('Buy all hacks command:');
    ns.tprint(
      'home; connect darkweb; buy BruteSSH.exe; buy FTPCrack.exe; buy relaySMTP.exe; buy HTTPWorm.exe; buy SQLInject.exe; home;'
    );
    ns.tprint('');
  }
}
