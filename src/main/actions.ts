import { NS } from '@ns';
import { runIf } from '/utils/index';

export const main = async (ns: NS): Promise<void> => {
  const firstRun: boolean = ns.args[0] as boolean;
  if (firstRun) {
    ns.run('/spider.js');
  }

  runIf(ns, 'custom-HUD-v2.js');
  if (ns.gang.inGang()) runIf(ns, 'gang/loop.js');
  if (ns.corporation.hasCorporation()) runIf(ns, 'corp/loop.js');
  ns.run('actions/buyTorHackPrograms.js');

  if (ns.singularity) {
    ns.run('actions/backdoorEverything.js', { preventDuplicates: true });
    ns.run('actions/joinFactions.js', { preventDuplicates: true });
  }
};
