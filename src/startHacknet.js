// import { settings } from './common.js'

const maxNodesDefault = 40 // settings.maxHacknetNodes
const maxStats = {
	level: 200,
	ram: 64,
	cores: 16,
}


export async function main(ns) {
	// ns.exit()
	const reserveMoney = ns.args[0] || 0
	const maxNodesToBuy = maxNodesDefault // ns.args[1] || maxNodesDefault
	const { hacknet: h } = ns;
	const money = () => ns.getServerMoneyAvailable('home') - reserveMoney

	const maxUpgrade = (i) => {
		const cost = {
			level: h.getLevelUpgradeCost(i, 1),
			ram: h.getRamUpgradeCost(i, 1),
			cores: h.getCoreUpgradeCost(i, 1),
			cache: h.getCacheUpgradeCost(i, 1),
		}

		const stats = h.getNodeStats(i)

		while (money() >= h.getRamUpgradeCost(i, 1) & h.getNodeStats(i).ram < maxStats.ram) h.upgradeRam(i, 1)
		while (money() >= h.getLevelUpgradeCost(i, 1) & h.getNodeStats(i).level < maxStats.level) h.upgradeLevel(i, 1)
		while (money() >= h.getCoreUpgradeCost(i, 1) & h.getNodeStats(i).cores < maxStats.cores) h.upgradeCore(i, 1)

	}

	while (money() >= h.getPurchaseNodeCost() & h.numNodes() < maxNodesToBuy) {
		ns.toast(`purchasing Hacknet Server: \$${Math.round(h.getPurchaseNodeCost())}`, 'info', null)
		const i = h.purchaseNode()
		maxUpgrade(i)
	}


	for (var i = 0; i < h.numNodes(); i++) {
		maxUpgrade(i)
	}

	// ns.exec('sandbox.js', 'home')
	ns.tprint('startHacknet.exe completed')
	ns.exit()
}