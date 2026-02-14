/**
 * Centralized price and weight utilities for accurate financial calculation.
 * Avoids floating-point precision errors by rounding to 2 decimal places.
 */

export const MIN_WEIGHT_KG = 0.5;

/**
 * Rounds a number to 2 decimal places for money display.
 * Uses integer rounding to avoid floating-point errors (e.g. 0.1 + 0.2).
 * @param {number} value
 * @returns {number}
 */
export function roundMoney(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return 0;
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100) / 100;
}

/**
 * Calculates line total from price per kg and weight.
 * total = pricePerKg * selectedWeight, rounded to 2 decimals.
 * @param {number} pricePerKg
 * @param {number} weightKg
 * @returns {number}
 */
export function calculateLineTotal(pricePerKg, weightKg) {
  const p = Number(pricePerKg);
  const w = Number(weightKg);
  if (!Number.isFinite(p) || !Number.isFinite(w) || w < 0) return 0;
  return roundMoney(p * w);
}

/**
 * Parses user weight input. Returns a valid number >= MIN_WEIGHT_KG or null.
 * @param {string} str
 * @returns {number | null}
 */
export function parseWeightInput(str) {
  if (str === "" || str === null || str === undefined) return null;
  const trimmed = String(str).trim().replace(/,/, ".");
  const num = Number(trimmed);
  if (Number.isNaN(num) || num < MIN_WEIGHT_KG) return null;
  return roundMoney(num);
}

/**
 * Clamps weight to allowed range (>= MIN_WEIGHT_KG).
 * @param {number} value
 * @returns {number}
 */
export function clampWeight(value) {
  const n = Number(value);
  if (Number.isNaN(n) || n < MIN_WEIGHT_KG) return MIN_WEIGHT_KG;
  return roundMoney(n);
}

/**
 * Returns true if value is a valid weight for cart (>= MIN_WEIGHT_KG, finite).
 * @param {number} value
 * @returns {boolean}
 */
export function isValidWeight(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= MIN_WEIGHT_KG;
}
