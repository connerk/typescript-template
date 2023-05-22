const ROOT_KIT_LIST = [
	"Baseball Bat",
	"Katana",
	"Glock 18C",
	"P90C",
	"Steyr AUG",
	"AK-47",
	"M15A10 Assault Rifle",
	"Bulletproof Vest",
	"Full Body Armor",
	"Ford Flex V20",
	"ATX1070 Superbike",
	"Mercedes-Benz S9001",
	"AWM Sniper Rifle",
	"White Ferrari",
	"Liquid Body Armor",
	"Graphene Plating Armor",
	"Bionic Arms",
	"Bionic Legs",
	"Bionic Spine",
	"BrachiBlades",
	"Nanofiber Weave",
	"Synthetic Heart",
	"Synfibril Muscle",
	"Graphene Bone Lacings",
] 
// ["NUKE Rootkit", "Soulstealer Rootkit", "Demon Rootkit", "Hmap Node", "Jack the Ripper"]

const reserveMoney = 0; // 9000000000

const missingRootkitList = (upgrades) => ROOT_KIT_LIST.filter(kit => !upgrades.includes(kit))

/** @param {NS} ns */
export async function main(ns) {
	const g = ns.gang
	const members = g.getMemberNames().map(member => g.getMemberInformation(member))
	members.forEach(member => {
		const { name, upgrades } = member
		const kitsToBuy = missingRootkitList(upgrades)
		kitsToBuy.forEach(kit => (ns.getServerMoneyAvailable('home') - reserveMoney >= g.getEquipmentCost(kit)) && g.purchaseEquipment(name, kit))
	})


}