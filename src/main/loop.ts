import { NS } from '@ns'
import { runIf } from '/utils/index'

const settings = {
	delay: 5000
}

export async function main(ns: NS): Promise<void> {
	runIf(ns, 'custom-HUD-v2.js')
	while(true){
		if (ns.gang.inGang()) runIf(ns, 'gang/loop.js')
		ns.run('actions/buyTorHackPrograms.js')

		await ns.sleep(settings.delay)
	}
}