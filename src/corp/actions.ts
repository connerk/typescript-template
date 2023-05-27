import { NS } from '@ns';

const ENERGY_THRESHOLD = 0.9;
const MORALE_THRESHOLD = 0.9;

export const main = async (ns: NS): Promise<void> => {
  const { corporation: corp } = ns;

  if (corp.hasCorporation()) {
    const corpData = corp.getCorporation();
    const { divisions: divisionsNames } = corpData;
    const { funds } = corpData;
    divisionsNames.forEach((divisionName) => {
      const division = corp.getDivision(divisionName);
      const cities = division.cities;
      const divisionType = division.type;

      // AdVerts
      const adverts = division.numAdVerts;
      // ns.tprint(`[${divisionName}] ${adverts} adverts`);

      cities.forEach((cityName) => {
        const office = corp.getOffice(divisionName, cityName);
        const warehouse = corp.getWarehouse(divisionName, cityName);
        const { numEmployees } = office;

        // Buy Tea
        const { avgEnergy, maxEnergy, avgMorale, maxMorale } = office;
        if (avgEnergy < maxEnergy * ENERGY_THRESHOLD)
          corp.buyTea(divisionName, cityName);

        // Throw Parties
        // TODO: Figure out how to calculate the amount to pay for a party
        if (avgMorale < maxMorale * MORALE_THRESHOLD)
          corp.throwParty(divisionName, cityName, 1000000);
      });
    });
  }
};
