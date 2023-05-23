import { NS } from "@ns";
export { PidController } from "/utils/PidController";

export const runIf = (ns: NS, script: string): number =>
	(!ns.scriptRunning(script, ns.getHostname()))
		? ns.run(script)
		: 0
