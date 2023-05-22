/** @param {NS} ns */
export async function main(ns) {
	const { gang } = ns;
	const members = gang.getMemberNames()
	members.forEach((member) => {

		ns.tprint(`${member}: ${JSON.stringify(gang.getAscensionResult(member))}`)
	})
}