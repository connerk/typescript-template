/** @param {NS} ns */
export async function main(ns) {
	try {
		const s = ns.singularity
		const torPrograms = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"] // s.getDarkwebPrograms()
		const myPrograms = ns.ls('home').filter(p => torPrograms.includes(p))
		const programsToPurchase = torPrograms
			.filter(p => !myPrograms.includes(p))
			.map(p => ({
				name: p,
				cost: s.getDarkwebProgramCost(p)
			}))

		programsToPurchase.forEach(p => {
			const money = ns.getServerMoneyAvailable('home')
			if (money >= p.cost) s.purchaseProgram(p.name)
		})
		return true
	} catch (e) {
		return false
	}
	// hello world
}