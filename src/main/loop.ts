import { NS } from '@ns';
import { settings } from '/common';
import { runIf } from '/utils/index';

export const main = async (ns: NS): Promise<void> => {
  try {
    ns.run('main/actions.js', 1, true);
    while (true) {
      runIf(ns, 'main/actions.js', 1, false);
      await ns.sleep(settings.delay);
    }
  } catch (e) {
    ns.tprint(`[ERROR] ${e}`);
  }
};
