import { NS } from '@ns';

export async function main(ns: NS) {
  const target = ns.args[0] as string;
  const threads = ns.args[1] as number;
  const delay = (ns.args[2] as number) || 0;
  await ns.sleep(delay);
  await ns.hack(target, { threads, stock: true });
  ns.exit();
}
