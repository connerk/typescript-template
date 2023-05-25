import { GangMemberInfo, NS } from '@ns';
import { settings } from '/common';

const CRIME_LIST = [
  'Baseball Bat',
  'Katana',
  'Glock 18C',
  'P90C',
  'Steyr AUG',
  'AK-47',
  'M15A10 Assault Rifle',
  'Bulletproof Vest',
  'Full Body Armor',
  'Ford Flex V20',
  'ATX1070 Superbike',
  'Mercedes-Benz S9001',
  'AWM Sniper Rifle',
  'White Ferrari',
  'Liquid Body Armor',
  'Graphene Plating Armor',
  'Bionic Arms',
  'Bionic Legs',
  'Bionic Spine',
  'BrachiBlades',
  'Nanofiber Weave',
  'Synthetic Heart',
  'Synfibril Muscle',
  'Graphene Bone Lacings',
];
const HACK_LIST = [
  'NUKE Rootkit',
  'Soulstealer Rootkit',
  'Demon Rootkit',
  'Hmap Node',
  'Jack the Ripper',
  'DataJack',
  'Neuralstimulator',
  'BitWire',
];

/**
 * @param {string[]} upgrades
 * @param {string[]} list
 * @returns {string[]}
 */
const missingRootkitList = (upgrades: string[], list: string[]) =>
  list.filter((kit) => !upgrades.includes(kit));

export async function main(ns: NS) {
  const { gang } = ns;
  const { isHacking } = gang.getGangInformation();
  const list = isHacking ? HACK_LIST : CRIME_LIST;
  const members: GangMemberInfo[] = gang
    .getMemberNames()
    .map((member) => gang.getMemberInformation(member));
  members.forEach((member) => {
    const { name, upgrades } = member;
    const kitsToBuy = missingRootkitList(upgrades, list);
    kitsToBuy.forEach(
      (kit) =>
        ns.getServerMoneyAvailable('home') - settings.reserveMoney >=
          gang.getEquipmentCost(kit) && gang.purchaseEquipment(name, kit)
    );
  });
}
