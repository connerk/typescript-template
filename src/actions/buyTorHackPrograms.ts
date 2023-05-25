import { NS } from '@ns'
import { hackPrograms } from '/common'

export const main = async (ns: NS): Promise<void> => {
	try {
		const s = ns.singularity
		if (!s) return
		s.purchaseTor()
		if (ns.hasTorRouter()) {
			const myPrograms = ns.ls('home').filter(p => hackPrograms.includes(p))
			const programsToPurchase = hackPrograms
				.filter(p => !myPrograms.includes(p))
				.map(p => ({
					name: p,
					cost: s.getDarkwebProgramCost(p)
				}))

			programsToPurchase.forEach(p => {
				const money = ns.getServerMoneyAvailable('home')
				if (money >= p.cost) s.purchaseProgram(p.name)
			})
		}
	} catch (e) {
		ns.tprint(`[ERROR] ${e}`)
	}
}