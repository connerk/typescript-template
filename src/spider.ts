import { settings, setItem, localeHHMMSS, hackPrograms, PERSONAL_SERVER_PREFIX } from '/common.js';
import { NS } from '@ns';
import { ServerMap } from '/types';

function getPlayerDetails(ns: NS) {
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

export async function main(ns: NS) {
  ns.tprint(`[${localeHHMMSS()}] Starting spider.js`);

  const scriptToRunAfter = ns.args[0] as string;

  const serverMap: ServerMap = {
    servers: {},
    lastUpdate: new Date().getTime(),
  };
  const scanArray = ['home'];

  while (scanArray.length) {
    const host: string = scanArray.shift()!;
    if (!host) return;

    serverMap.servers[host] = {
      host,
      ports: ns.getServerNumPortsRequired(host),
      hackingLevel: ns.getServerRequiredHackingLevel(host),
      maxMoney: ns.getServerMaxMoney(host),
      growth: ns.getServerGrowth(host),
      minSecurityLevel: ns.getServerMinSecurityLevel(host),
      baseSecurityLevel: ns.getServerBaseSecurityLevel(host),
      ram: ns.getServerMaxRam(host),
      files: ns.ls(host),
      connections: [],
      parent: '',
      children: [],
    };

    const playerDetails = getPlayerDetails(ns);
    if (!ns.hasRootAccess(host)) {
      if (
        serverMap.servers[host].ports <= playerDetails.portHacks &&
        serverMap.servers[host].hackingLevel <= playerDetails.hackingLevel
      ) {
        hackPrograms.forEach((hackProgram: string) => {
          if (ns.fileExists(hackProgram, 'home')) {
            const program: string = hackProgram
              .split('.')
              .shift()!
              .toLocaleLowerCase();
            const nsProgramMap = new Map<string, (host: string) => void>([
              ['brutessh', ns.brutessh],
              ['ftpcrack', ns.ftpcrack],
              ['relaysmtp', ns.relaysmtp],
              ['httpworm', ns.httpworm],
              ['sqlinject', ns.sqlinject],
            ]);
            const programToUse: (host: string) => void =
              nsProgramMap.get(program)!;
            programToUse(host);
          }
        });
        ns.nuke(host);
      }
    }

    const connections = ns.scan(host) || ['home'];
    serverMap.servers[host].connections = connections;

    connections
      .filter((hostname) => !serverMap.servers[hostname])
      .forEach((hostname) => scanArray.push(hostname));
  }

  let hasAllParents = false;

  while (!hasAllParents) {
    hasAllParents = true;

    Object.keys(serverMap.servers).forEach((hostname) => {
      const server = serverMap.servers[hostname];

      if (!server.parent) hasAllParents = false;

      if (hostname === 'home') {
        server.parent = 'home';
        server.children = server.children ? server.children : [];
      }

      if (hostname.includes(PERSONAL_SERVER_PREFIX)) {
        server.parent = 'home';
        server.children = [];

        if (serverMap.servers[server.parent].children) {
          serverMap.servers[server.parent].children.push(hostname);
        } else {
          serverMap.servers[server.parent].children = [hostname];
        }
      }

      if (!server.parent) {
        if (server.connections.length === 1) {
          server.parent = server.connections[0];
          server.children = [];

          if (serverMap.servers[server.parent].children) {
            serverMap.servers[server.parent].children.push(hostname);
          } else {
            serverMap.servers[server.parent].children = [hostname];
          }
        } else {
          if (!server.children) {
            server.children = [];
          }

          if (server.children.length) {
            const parent = server.connections.filter(
              (hostname) => !server.children.includes(hostname)
            );

            if (parent.length === 1) {
              server.parent = parent.shift()!;

              if (serverMap.servers[server.parent].children) {
                serverMap.servers[server.parent].children.push(hostname);
              } else {
                serverMap.servers[server.parent].children = [hostname];
              }
            }
          }
        }
      }
    });
  }

  setItem(settings.keys.serverMap, serverMap);

  if (!scriptToRunAfter) {
    ns.tprint(`[${localeHHMMSS()}] Spawning mainHack.js`);
    ns.spawn('mainHack.js', 1);
  } else {
    ns.tprint(`[${localeHHMMSS()}] Spawning ${scriptToRunAfter}`);
    ns.spawn(scriptToRunAfter, 1);
  }
}
