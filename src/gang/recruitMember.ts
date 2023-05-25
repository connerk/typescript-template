import { NS } from '@ns';

export const main = async (ns: NS): Promise<void> => {
  const { gang } = ns;
  gang.canRecruitMember() && gang.recruitMember('Gang Member');
};
