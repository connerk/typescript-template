import { NS } from '@ns';
import { settings, getItem } from '/common';
import { navigateToServer } from '/actions/navigateToServer';

export const main = async (ns: NS): Promise<void> => {
  const { singularity: s } = ns;
  if (!s) return;
  const serverMap = getItem(settings.keys.serverMap);

  const hackLevel = ns.getHackingLevel();
  const hackableServers = Object.keys(serverMap.servers)
    .map((s) => ns.getServer(s))
    .filter(
      (s) =>
        !s.backdoorInstalled &&
        s.requiredHackingSkill &&
        s.requiredHackingSkill <= hackLevel &&
        s.hostname !== 'home'
    )
    .map((s) => s.hostname);
  if (!hackableServers.length) return;
  ns.tprint(`Found ${hackableServers.length} hackable servers`);
  // ns.tprint(JSON.stringify(hackableServers, null, 2));

  for (const i in hackableServers) {
    const host = hackableServers[i];
    const {
      openPortCount,
      numOpenPortsRequired,
      hostname,
      sshPortOpen,
      ftpPortOpen,
      httpPortOpen,
      sqlPortOpen,
      smtpPortOpen,
    } = ns.getServer(host);

    if (openPortCount! < numOpenPortsRequired!) {
      if (!sshPortOpen && ns.fileExists('BruteSSH.exe', 'home'))
        ns.brutessh(hostname);
      if (!ftpPortOpen && ns.fileExists('FTPCrack.exe', 'home'))
        ns.ftpcrack(hostname);
      if (!smtpPortOpen && ns.fileExists('relaySMTP.exe', 'home'))
        ns.relaysmtp(hostname);
      if (!httpPortOpen && ns.fileExists('HTTPWorm.exe', 'home'))
        ns.httpworm(hostname);
      if (!sqlPortOpen && ns.fileExists('SQLInject.exe', 'home'))
        ns.sqlinject(hostname);
    }

    ns.nuke(hostname);

    if (
      ns.getServer(hostname).hasAdminRights &&
      ns.getServer(hostname).openPortCount! >= numOpenPortsRequired!
    ) {
      // ns.exec('actions/navigateToServer.js', 'home', { threads: 1 }, hostname);
      navigateToServer(ns, hostname);
      while (!ns.getServer(hostname).isConnectedTo) {
        ns.tprint(`Connecting to ${hostname}`);
        await ns.sleep(1000);
      }
      await s.installBackdoor();
      ns.tprint(`Installing backdoor on ${hostname}`);
      while (!ns.getServer(hostname).backdoorInstalled) {
        ns.tprint(`backdoor in progress on ${hostname}`);
        await ns.sleep(1000);
      }
      ns.tprint(`Installed backdoor on ${hostname} successfully`);
    }
  }
  s.connect('home');
};
