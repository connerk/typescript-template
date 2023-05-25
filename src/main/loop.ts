import { NS } from '@ns';
import { settings } from '/common';

export const main = async (ns: NS): Promise<void> => {
  try {
    while (true) {
      ns.run('main/actions.js');
      await ns.sleep(settings.delay);
    }
  } catch (e) {
    ns.tprint(`[ERROR] ${e}`);
  }
};
