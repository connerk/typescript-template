import { NS } from '@ns';
import { localeHHMMSS, settings } from '/common';

export async function main(ns: NS) {
  ns.tprint(`[${localeHHMMSS()}] Starting Corporations`);
  while (true) {
    ns.run('corp/actions.js');
    await ns.sleep(settings.delay);
  }
}
