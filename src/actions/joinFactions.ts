import { NS } from '@ns';

export const main = async (ns: NS): Promise<void> => {
  const { singularity } = ns;
  if (!singularity) {
    ns.tprint('Singularity not installed');
    return;
  }
  const invites = singularity.checkFactionInvitations();
  invites.forEach((invite) => singularity.joinFaction(invite));
};
