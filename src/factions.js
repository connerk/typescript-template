export async function main(ns) {
	//gets which augmentations the player owns, including ones not installed
	var owned = ns.singularity.getOwnedAugmentations(true);
	//used to remove 'NeuroFlux Governor' from augmentation list
	var nero = ("NeuroFlux Governor");
	//checks for what argument the player passed
	var fact = ns.args[0];
	//used to check if the user wants to clear the terminal when running
	var clearArg = ns.args[1];
	//used to get information about the gang the player is in, if in one. used to indicate the player's gang faction in the checklist
	var gangInfo = ns.gang.inGang() ? ns.gang.getGangInformation() : {};

	//returns a list of augmentations from a fact
	function factionAugmentation(n) {
		return ns.singularity.getAugmentationsFromFaction(n);
	}

	//filters out 'NeuroFlux Governor' from the list of augmentations
	function filterAugs(a) {
		return a.filter(e => e != nero);
	}

	//checks if the user chose to clear the terminal of previous entries
	if (clearArg == "Y" || clearArg == "y") {
		ns.ui.clearTerminal();
	} else if (fact == "Y" || fact == "y") {
		ns.ui.clearTerminal();
	}

	//runs the 'help' or 'test' function if specified, else runs the checklist
	if (fact == "Help" || fact == "help") {
		help();
	} else if (fact == "Test" || fact == "test") {
		test();
	} else {
		localChecklist();
	}

	/*
	function that checks if all augmentations have been purchased from a faction and returns '[X]' or '[O]' accordingly
	will return an additional asterisk to indicate the gang faction the player is in
	*/
	function remainingFactionAugments(faction) {
		var n = faction;
		var factionAugs = factionAugmentation(n);
		factionAugs = filterAugs(factionAugs);
		var augsLength = factionAugs.length;

		for (var i = 0; i < augsLength; i++) {
			while (true) {
				if (owned.includes(factionAugs[i]) == true) {
					factionAugs.splice(i, 1);
					i = i - 1;
					break;
				} else {
					break;
				}
			}
		}

		if (n == gangInfo[Object.keys(gangInfo)[0]]) {
			if (factionAugs.length == 0) {
				return "[X] *";
			} else {
				return "[O] *";
			}
		} else {
			if (factionAugs.length == 0) {
				return "[X]";
			} else {
				return "[O]";
			}
		}
	}

	//prints out the actual checklist and respective faction checks
	function localChecklist() {
		let text = ("\n\n\
		┌---------------Checklist---------------┐\n\
		|					|\n\
		|	----Early Game Factions----	|\n\
		|	CyberSec:		"+ remainingFactionAugments("CyberSec") + "	|\n\
		|	Tian Di Hui:		"+ remainingFactionAugments("Tian Di Hui") + "	|\n\
		|	Netburners:		"+ remainingFactionAugments("Netburners") + "	|\n\
		|					|\n\
		|	-------City Factions-------	|\n\
		|	Sector-12:		"+ remainingFactionAugments("Sector-12") + "	|\n\
		|	Aevum:			"+ remainingFactionAugments("Aevum") + "	|\n\
		|	New Tokyo:		"+ remainingFactionAugments("New Tokyo") + "	|\n\
		|	Chongqing:		"+ remainingFactionAugments("Chongqing") + "	|\n\
		|	Ishima:			"+ remainingFactionAugments("Ishima") + "	|\n\
		|	Volhaven:		"+ remainingFactionAugments("Volhaven") + "	|\n\
		|					|\n\
		|	-------Hacking Groups------	|\n\
		|	NiteSec:		"+ remainingFactionAugments("NiteSec") + "	|\n\
		|	The Black Hand:		"+ remainingFactionAugments("The Black Hand") + "	|\n\
		|	BitRunners:		"+ remainingFactionAugments("BitRunners") + "	|\n\
		|					|\n\
		|	------Megacorporations-----	|\n\
		|	ECorp:			"+ remainingFactionAugments("ECorp") + "	|\n\
		|	MegaCorp:		"+ remainingFactionAugments("MegaCorp") + "	|\n\
		|	KuaiGong International:	"+ remainingFactionAugments("KuaiGong International") + "	|\n\
		|	Four Sigma:		"+ remainingFactionAugments("Four Sigma") + "	|\n\
		|	NWO:			"+ remainingFactionAugments("NWO") + "	|\n\
		|	Blade Industries:	"+ remainingFactionAugments("Blade Industries") + "	|\n\
		|	OmniTek Incorporated:	"+ remainingFactionAugments("OmniTek Incorporated") + "	|\n\
		|	Bachman & Associates:	"+ remainingFactionAugments("Bachman & Associates") + "	|\n\
		|	Clarke Incorporated:	"+ remainingFactionAugments("Clarke Incorporated") + "	|\n\
		|	Fulcrum Technologies:	"+ remainingFactionAugments("Fulcrum Secret Technologies") + "	|\n\
		|					|\n\
		|	---Criminal Organizations--	|\n\
		|	Slum Snakes:		"+ remainingFactionAugments("Slum Snakes") + "	|\n\
		|	Tetrads:		"+ remainingFactionAugments("Tetrads") + "	|\n\
		|	Silhouette:		"+ remainingFactionAugments("Silhouette") + "	|\n\
		|	Speakers for the Dead:	"+ remainingFactionAugments("Speakers for the Dead") + "	|\n\
		|	The Dark Army:		"+ remainingFactionAugments("The Dark Army") + "	|\n\
		|	The Syndicate:		"+ remainingFactionAugments("The Syndicate") + "	|\n\
		|					|\n\
		|	-----Endgame Factions------	|\n\
		|	The Covenant:		"+ remainingFactionAugments("The Covenant") + "	|\n\
		|	Daedalus:		"+ remainingFactionAugments("Daedalus") + "	|\n\
		|	Illuminati:		"+ remainingFactionAugments("Illuminati") + "	|\n\
		|					|\n\
		|	------Special Factions-----	|\n\
		|	Bladeburners:		"+ remainingFactionAugments("Bladeburners") + "	|\n\
		|	Shadows of Anarchy:	"+ remainingFactionAugments("Shadows of Anarchy") + "	|\n\
		└---------------------------------------┘\n\n")
		ns.tprint(text);
	}

	//If-Else list for if the player specified a faction to check its remaining augmentations

	//early game factions
	if (fact == "CyberSec" || fact == "cybersec" || fact == "cyber") {
		factionAugsFunc("CyberSec");
	} else if (fact == "Tian-Di-Hui" || fact == "tian-di-hui" || fact == "tian") {
		factionAugsFunc("Tian Di Hui");
	} else if (fact == "Netburners" || fact == "netburners" || fact == "net") {
		factionAugsFunc("Netburners");

		//city factions
	} else if (fact == "Sector-12" || fact == "sector-12" || fact == "sector") {
		factionAugsFunc("Sector-12");
	} else if (fact == "Chongqing" || fact == "chongqing" || fact == "chong") {
		factionAugsFunc("Chongqing");
	} else if (fact == "New-Tokyo" || fact == "new-tokyo" || fact == "tokyo") {
		factionAugsFunc("New Tokyo");
	} else if (fact == "Ishima" || fact == "ishima" || fact == "ishima") {
		factionAugsFunc("Ishima");
	} else if (fact == "Aevum" || fact == "aevum" || fact == "aevum") {
		factionAugsFunc("Aevum");
	} else if (fact == "Volhaven" || fact == "volhaven" || fact == "vol") {
		factionAugsFunc("Volhaven");

		//hacking factions
	} else if (fact == "NiteSec" || fact == "nitesec" || fact == "nite") {
		factionAugsFunc("NiteSec");
	} else if (fact == "The-Black-Hand" || fact == "the-black-hand" || fact == "black") {
		factionAugsFunc("The Black Hand");
	} else if (fact == "BitRunners" || fact == "bitrunners" || fact == "bit") {
		factionAugsFunc("BitRunners");

		//megacorporation facts
	} else if (fact == "ECorp" || fact == "ecorp" || fact == "ec") {
		factionAugsFunc("ECorp");
	} else if (fact == "MegaCorp" || fact == "megacorp" || fact == "mega") {
		factionAugsFunc("MegaCorp");
	} else if (fact == "KuaiGong-International" || fact == "kuaigong-international" || fact == "kuai") {
		factionAugsFunc("KuaiGong International");
	} else if (fact == "Four-Sigma" || fact == "four-sigma" || fact == "four") {
		factionAugsFunc("Four Sigma");
	} else if (fact == "NWO" || fact == "nwo") {
		factionAugsFunc("NWO");
	} else if (fact == "Blade-Industries" || fact == "blade-industries" || fact == "blade") {
		factionAugsFunc("Blade Industries");
	} else if (fact == "OmniTek-Incorporated" || fact == "omnitek-incorporated" || fact == "omni") {
		factionAugsFunc("OmniTek Incorporated");
	} else if (fact == "Bachman-Associates" || fact == "backman-associates" || fact == "bach") {
		factionAugsFunc("Bachman & Associates");
	} else if (fact == "Clarke-Incororated" || fact == "clarke-incorporated" || fact == "clark") {
		factionAugsFunc("Clarke Incorporated");
	} else if (fact == "Fulcrum-Secret-Technologies" || fact == "fulcrum-secret-technologies" || fact == "fulc") {
		factionAugsFunc("Fulcrum Secret Technologies");

		//criminal factions
	} else if (fact == "Slum-Snakes" || fact == "slum-snakes" || fact == "slum") {
		factionAugsFunc("Slum Snakes");
	} else if (fact == "Tetrads" || fact == "tetrads" || fact == "tet") {
		factionAugsFunc("Tetrads");
	} else if (fact == "Silhouette" || fact == "silhouette" || fact == "sil") {
		factionAugsFunc("Silhouette");
	} else if (fact == "Speakers-for-the-Dead" || fact == "speakers-for-the-dead" || fact == "speak") {
		factionAugsFunc("Speakers for the Dead");
	} else if (fact == "The-Dark-Army" || fact == "the-dark-army" || fact == "dark") {
		factionAugsFunc("The Dark Army");
	} else if (fact == "The-Syndicate" || fact == "the-syndicate" || fact == "synd") {
		factionAugsFunc("The Syndiacte");
	} else if (fact == "The-Covenant" || fact == "the-covenant" || fact == "cov") {
		factionAugsFunc("The Covenant");
	} else if (fact == "Daedalus" || fact == "daedalus" || fact == "daed") {
		factionAugsFunc("Daedalus");
	} else if (fact == "Illuminati" || fact == "illuminati" || fact == "illum") {
		factionAugsFunc("Illuminati");

		//special factions
	} else if (fact == "Shadows-of-Anarchy" || fact == "shadows-of-anarchy" || fact == "shadow") {
		factionAugsFunc("Shadows of Anarchy");
	} else if (fact == "Bladeburners" || fact == "bladeburners" || fact == "burn") {
		factionAugsFunc("Bladeburners");
	}

	//if specified will check for and print out the remaining augmentations for a given faction or that there are none left
	function factionAugsFunc(faction) {
		var n = faction;
		var factionAugs = factionAugmentation(n)
		factionAugs = filterAugs(factionAugs);
		var augsLength = factionAugs.length;
		var output = "";

		for (var i = 0; i < augsLength; i++) {
			while (true) {
				if (owned.includes(factionAugs[i]) == true) {
					factionAugs.splice(i, 1);
					i = i - 1;
					break;
				}
				break;
			}
		}

		if (factionAugs.length > 0) {
			output += ("\n\n\n			-----Remaining Augmentations-----\n\n");
			for (var i = 0; i < factionAugs.length; i++) {
				output += ("		- " + factionAugs[i] + "\n");
			}
			output += ("\n\n\n");
		} else {
			output += ("\n\n			-----There are no remaining augmentations for faction '" + n + "'-----\n\n");
		}

		ns.tprint(output);
	}

	//if the player specifies the help arg, will print out a list of passable arguments and shorthand arguments
	function help() {
		ns.tprint("\n\n\n\n\
		-----Pass the following names as arguments-----		-----Shorthand Arguments-----\n\n\
			- CyberSec						'cyber'\n\
			- Tian-Di-Hui						'tian'\n\
			- Netburners						'net'\n\
			- Sector-12						'sector'\n\
			- Chongqing						'chong'\n\
			- New-Tokyo						'tokyo'\n\
			- Ishima						'ishima'\n\
			- Aevum							'aevum'\n\
			- Volhaven						'vol'\n\
			- NiteSec						'nite'\n\
			- The-Black-Hand					'black'\n\
			- BitRunners						'bit'\n\
			- Slum-Snakes						'slum'\n\
			- Tetrads						'tet'\n\
			- Silhouette						'sil'\n\
			- Speakers-for-the-Dead					'speak'\n\
			- The-Dark-Army						'dark'\n\
			- The-Syndicate						'synd'\n\
			- The-Covenant						'cov'\n\
			- Daedalus						'daed'\n\
			- Illuminati						'illum'\n\
			- ECorp							'ec'\n\
			- MegaCorp						'mega'\n\
			- KuaiGong-International				'kuai'\n\
			- Four-Sigma						'four'\n\
			- NWO							'nwo'\n\
			- Blade-Industries					'blade'\n\
			- OmniTek-Incorporated					'omni'\n\
			- Bachman-Associates					'bach'\n\
			- Clarke-Incorporated					'clark'\n\
			- Fulcrum-Secret-Technologies				'fulc'\n\
			- Shadows-of-Anarchy					'shadow'\n\
			- Bladeburners						'burn'\n\n\
				---Other---\n\n\
			- Help\n\
			- Test\n\n");
	}

	//function used for debugging
	function test() {
		ns.tprint(" \n \n\
			Test passed. (Used for debugging)\n ");
	}
}