/** @param {NS} ns */
export async function main(ns) {
	const torHackProgramsBought = await ns.run('actions/buyTorHackPrograms.js')
	ns.tprint(localStorage.getItem(localStorage.key(0)))
}