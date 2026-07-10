CREATE TABLE IF NOT EXISTS commutation_factors (
  id INTEGER PRIMARY KEY,
  age_next_birthday INTEGER NOT NULL,
  factor DECIMAL(10, 3) NOT NULL,
  effective_from DATE NOT NULL,
  circular_number VARCHAR(100) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_commutation_factors_active_age
  ON commutation_factors (active, age_next_birthday);
