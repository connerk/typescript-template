import { NS } from '@ns';
import { PidController } from '/utils/PidController.js';

export async function main(ns: NS) {
  const { corporation: corp } = ns;
  const test = new PidController(1, 1, 1, 1);

  test.setTarget(15);

  const constants = corp.hasCorporation();

  ns.tprint(constants);
}
