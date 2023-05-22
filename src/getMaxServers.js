/** @param {NS} ns */
export async function main(ns) {
	const maxServers = ns.getPurchasedServerLimit()
	ns.tprint(maxServers)
	return maxServers
}