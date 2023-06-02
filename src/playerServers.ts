import { NS } from '@ns';
import { settings, setItem, getItem, localeHHMMSS, createUUID } from '/common';
import { ServerMap } from '/types';

function updateServer(ns: NS, serverMap: ServerMap, host: string) {
  serverMap.servers[host] = {
    host,
    ports: ns.getServerNumPortsRequired(host),
    hackingLevel: ns.getServerRequiredHackingLevel(host),
    maxMoney: ns.getServerMaxMoney(host),
    growth: ns.getServerGrowth(host),
    minSecurityLevel: ns.getServerMinSecurityLevel(host),
    baseSecurityLevel: ns.getServerBaseSecurityLevel(host),
    ram: ns.getServerMaxRam(host),
    connections: ['home'],
    parent: 'home',
    children: [],
    files: ns.ls(host),
  };

  Object.keys(serverMap.servers).map((hostname) => {
    if (!ns.serverExists(hostname)) {
      delete serverMap.servers[hostname];
    }
  });

  setItem(settings.keys.serverMap, serverMap);
}

function getPurchasedServers(ns: NS) {
  const purchasedServers = ns.getPurchasedServers();
  if (purchasedServers.length) {
    purchasedServers.sort((a, b) => {
      const totalRamA = ns.getServerMaxRam(a);
      const totalRamB = ns.getServerMaxRam(b);

      if (totalRamA === totalRamB) {
        return ns.getServerMaxRam(a) - ns.getServerMaxRam(b);
      } else {
        return totalRamA - totalRamB;
      }
    });
  }

  return purchasedServers;
}

export async function main(ns: NS) {
  ns.tprint(`[${localeHHMMSS()}] Starting playerServers.js`);

  settings.playerServers.maxGbRam = ns.getPurchasedServerMaxRam();
  // settings.playerServers.maxPlayerServers = ns.getPurchasedServerLimit()

  while (true) {
    let didChange = false;

    const serverMap = getItem(settings.keys.serverMap);
    let purchasedServers = getPurchasedServers(ns);

    const action =
      purchasedServers.length < settings.playerServers.maxPlayerServers
        ? settings.playerServers.actions.BUY
        : settings.playerServers.actions.UPGRADE;

    if (action == settings.playerServers.actions.BUY) {
      const smallestCurrentServer = purchasedServers.length
        ? ns.getServerMaxRam(purchasedServers[0])
        : 0;
      let targetRam = Math.max(
        settings.playerServers.minGbRam,
        smallestCurrentServer
      );

      if (targetRam === settings.playerServers.minGbRam) {
        while (
          ns.getServerMoneyAvailable('home') *
            settings.playerServers.totalMoneyAllocation >=
          targetRam *
            settings.playerServers.gbRamCost *
            settings.playerServers.maxPlayerServers
        ) {
          targetRam *= 2;
        }

        targetRam /= 2;
      }

      targetRam = Math.max(settings.playerServers.minGbRam, targetRam);
      targetRam = Math.min(targetRam, settings.playerServers.maxGbRam);

      if (
        ns.getServerMoneyAvailable('home') *
          settings.playerServers.totalMoneyAllocation >=
        targetRam * settings.playerServers.gbRamCost
      ) {
        let hostname = `${
          settings.playerServers.PLAYER_SERVER_PREFIX
        }${targetRam}-${createUUID()}`;
        hostname = ns.purchaseServer(hostname, targetRam);

        if (hostname) {
          ns.tprint(
            `[${localeHHMMSS()}] Bought new server: ${hostname} (${targetRam} GB)`
          );

          updateServer(ns, serverMap, hostname);
          didChange = true;
        }
      }
    } else {
      const smallestCurrentServer = Math.max(
        ns.getServerMaxRam(purchasedServers[0]),
        settings.playerServers.minGbRam
      );
      const biggestCurrentServer = ns.getServerMaxRam(
        purchasedServers[purchasedServers.length - 1]
      );
      let targetRam = biggestCurrentServer;

      if (smallestCurrentServer === settings.playerServers.maxGbRam) {
        ns.tprint(`[${localeHHMMSS()}] All servers maxxed. Exiting.`);
        ns.exit();
        return;
      }

      if (smallestCurrentServer === biggestCurrentServer) {
        while (
          ns.getServerMoneyAvailable('home') *
            settings.playerServers.totalMoneyAllocation >=
          targetRam * settings.playerServers.gbRamCost
        ) {
          targetRam *= 4;
        }
      }

      targetRam = Math.min(targetRam, settings.playerServers.maxGbRam);
      purchasedServers = getPurchasedServers(ns);
      if (targetRam > ns.getServerMaxRam(purchasedServers[0])) {
        didChange = true;
        while (didChange) {
          didChange = false;
          purchasedServers = getPurchasedServers(ns);

          if (targetRam > ns.getServerMaxRam(purchasedServers[0])) {
            if (
              ns.getServerMoneyAvailable('home') *
                settings.playerServers.totalMoneyAllocation >=
              targetRam * settings.playerServers.gbRamCost
            ) {
              let hostname = `${
                settings.playerServers.PLAYER_SERVER_PREFIX
              }${targetRam}-${createUUID()}`;

              await ns.killall(purchasedServers[0]);
              await ns.sleep(10);
              const serverDeleted = await ns.deleteServer(purchasedServers[0]);
              if (serverDeleted) {
                hostname = await ns.purchaseServer(hostname, targetRam);

                ns.tprint({ hostname });
                if (hostname) {
                  ns.tprint(
                    `[${localeHHMMSS()}] Upgraded: ${
                      purchasedServers[0]
                    } into server: ${hostname} (${targetRam} GB)`
                  );

                  updateServer(ns, serverMap, hostname);
                  didChange = true;
                }
              }
            }
          }
        }
      }
    }

    if (!didChange) {
      await ns.sleep(5123);
    }
  }
}
