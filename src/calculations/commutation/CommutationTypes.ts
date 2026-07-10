export interface CommutationFactorRow {
  id: number;
  age_next_birthday: number;
  factor: number;
  effective_from: string;
  circular_number: string;
  active: boolean;
}

export interface CommutationFactorResult {
  ageNextBirthday: number;
  factor: number | null;
  source: "database" | "default-json" | "not-found";
  effectiveFrom: string | null;
  circularNumber: string | null;
}

export interface CommutationFactorRepository {
  findActiveByAgeNextBirthday(ageNextBirthday: number): CommutationFactorRow | null;
}
