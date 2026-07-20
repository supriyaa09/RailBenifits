import { COMMUTATION_FACTORS } from "../../../formula-engine/generated/referenceData";
import type {
  CommutationFactorRepository,
  CommutationFactorResult,
  CommutationFactorRow,
} from "./CommutationTypes";

let activeRepository: CommutationFactorRepository | null = null;

export function registerCommutationFactorRepository(
  repository: CommutationFactorRepository | null,
) {
  activeRepository = repository;
}

export function getCommutationFactor(ageNextBirthday: number): CommutationFactorResult {
  const age = normalizeAge(ageNextBirthday);

  const databaseRow = activeRepository?.findActiveByAgeNextBirthday(age) ?? null;
  if (databaseRow) {
    return toResult(age, databaseRow, "database");
  }

  const fallbackRow = (COMMUTATION_FACTORS as readonly CommutationFactorRow[]).find(
    (row) => row.active && row.age_next_birthday === age,
  );

  if (fallbackRow) {
    return toResult(age, fallbackRow, "default-json");
  }

  return {
    ageNextBirthday: age,
    factor: null,
    source: "not-found",
    effectiveFrom: null,
    circularNumber: null,
  };
}

function normalizeAge(ageNextBirthday: number): number {
  if (!Number.isFinite(ageNextBirthday) || ageNextBirthday < 0) return 0;
  return Math.trunc(ageNextBirthday);
}

function toResult(
  ageNextBirthday: number,
  row: CommutationFactorRow,
  source: "database" | "default-json",
): CommutationFactorResult {
  return {
    ageNextBirthday,
    factor: row.factor,
    source,
    effectiveFrom: row.effective_from,
    circularNumber: row.circular_number,
  };
}
