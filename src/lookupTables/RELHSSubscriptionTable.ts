export interface RELHSSubscriptionBand {
  label: string;
  minLevel: number;
  maxLevel: number | null;
  amount: number;
}

export const RELHSSubscriptionTable: RELHSSubscriptionBand[] = [
  { label: "Level 1 - Level 5", minLevel: 1, maxLevel: 5, amount: 30000 },
  { label: "Level 6", minLevel: 6, maxLevel: 6, amount: 54000 },
  { label: "Level 7 - Level 11", minLevel: 7, maxLevel: 11, amount: 78000 },
  { label: "Level 12 and Above", minLevel: 12, maxLevel: null, amount: 120000 },
];

export function findRELHSSubscriptionBand(level: number): RELHSSubscriptionBand | null {
  return RELHSSubscriptionTable.find((band) => {
    const withinLowerBound = level >= band.minLevel;
    const withinUpperBound = band.maxLevel === null || level <= band.maxLevel;
    return withinLowerBound && withinUpperBound;
  }) ?? null;
}
