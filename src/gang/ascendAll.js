const settings = {
	ascendThreshold: 1.2,
}

/** @param {NS} ns */
export async function main(ns) {
	const g = ns.gang
	const members = g.getMemberNames().map(member => g.getMemberInformation(member))

	members.forEach(member => {
		const {name, hack_asc_points} = member
		const ascRes = g.getAscensionResult(name)
		if (ascRes?.hack >= settings.ascendThreshold) {
			g.ascendMember(name)
			ns.toast(`${name} ascended`,'success')
		}
		if (ascRes?.str >= settings.ascendThreshold) {
			g.ascendMember(name)
			ns.toast(`${name} ascended`,'success')
		}
	})
}