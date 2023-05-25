import { GangMemberAscension, GangMemberInfo, NS } from '@ns';
import { settings } from '/common';

export async function main(ns: NS) {
  const { gang } = ns;
  const members: GangMemberInfo[] = gang
    .getMemberNames()
    .map((member) => gang.getMemberInformation(member));

  members.forEach((member) => {
    const { name } = member;
    const ascRes: GangMemberAscension = gang.getAscensionResult(name)!;
    if (
      ascRes?.hack >= settings.ascendThreshold ||
      ascRes?.str >= settings.ascendThreshold
    ) {
      gang.ascendMember(name);
      ns.toast(`${name} ascended`, 'success');
    }
  });
}
