import { NS } from '@ns';
import { settings, getItem } from '/common';
import { pathToServer } from '/find';

export const main = async (ns: NS): Promise<void> => {
  const { singularity } = ns;
  if (!singularity) {
    ns.tprint('Singularity not installed');
    return;
  }

  const server = ns.args[0] as string;
  if (!server) {
    ns.tprint('No server provided');
    return;
  }

  navigateToServer(ns, server);
};

export const navigateToServer = (ns: NS, server: string): void => {
  const { singularity } = ns;
  const serverMap = getItem(settings.keys.serverMap);
  const jumps = pathToServer(serverMap.servers, server).reverse();
  for (const j in jumps) {
    singularity.connect(jumps[j]);
  }
};