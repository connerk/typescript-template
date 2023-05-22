const settings = {
	delay: 5000
}
/** @param {NS} ns */
export async function main(ns) {
	while(true){
		await ns.run('gang/ascendAll.js')
		await ns.run('gang/equipAllRootKits.js')
		await ns.sleep(settings.delay)
	}
}