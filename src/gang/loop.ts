import { NS } from "@ns";

const settings = {
	delay: 5000
}
export async function main(ns: NS): Promise<void>  {
	ns.tprint('running Gangs')
	while(true){
		await ns.run('gang/ascendAll.js')
		await ns.run('gang/equipAllRootKits.js')
		await ns.sleep(settings.delay)
	}
}