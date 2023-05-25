import { NS } from '@ns';
export { PidController } from '/utils/PidController';

export const runIf = (
  ns: NS,
  script: string,
  threads = 1,
  ...args: (string | number | boolean)[]
): number =>
  !ns.scriptRunning(script, ns.getHostname())
    ? ns.run(script, threads, ...args)
    : 0;
