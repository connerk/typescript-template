import Controller from './utils/pid';
/** @param {NS} ns */
export async function main(ns) {
	const {corporation: corp} = ns
	const test = new Controller()

	test.setTarget(15);


	let constants = corp.hasCorporation()

	ns.tprint(constants);

}