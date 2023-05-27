import { NS } from '@ns';
import { localeHHMMSS } from '/common';

const settings = {
  delay: 5000,
};
export async function main(ns: NS): Promise<void> {
  ns.tprint(`[${localeHHMMSS()}] Starting gangs.js`);
  while (true) {
    await ns.run('gang/ascendAll.js');
    await ns.run('gang/equipAllRootKits.js');
    await ns.sleep(settings.delay);
  }
}
