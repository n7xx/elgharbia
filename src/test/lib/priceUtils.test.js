import { describe, it, expect } from "vitest";
import {
  roundMoney,
  calculateLineTotal,
  parseWeightInput,
  clampWeight,
  isValidWeight,
  MIN_WEIGHT_KG,
} from "../../lib/priceUtils";

describe("priceUtils", () => {
  describe("MIN_WEIGHT_KG", () => {
    it("is 0.5", () => {
      expect(MIN_WEIGHT_KG).toBe(0.5);
    });
  });

  describe("roundMoney", () => {
    it("rounds to 2 decimal places", () => {
      expect(roundMoney(10.123)).toBe(10.12);
      expect(roundMoney(10.126)).toBe(10.13);
      expect(roundMoney(10.125)).toBe(10.13);
    });

    it("avoids floating point precision errors", () => {
      expect(roundMoney(0.1 + 0.2)).toBe(0.3);
      expect(roundMoney(380 * 0.5)).toBe(190);
    });

    it("returns 0 for NaN, null, undefined", () => {
      expect(roundMoney(NaN)).toBe(0);
      expect(roundMoney(null)).toBe(0);
      expect(roundMoney(undefined)).toBe(0);
    });

    it("returns 0 for non-finite values", () => {
      expect(roundMoney(Infinity)).toBe(0);
      expect(roundMoney(-Infinity)).toBe(0);
    });
  });

  describe("calculateLineTotal", () => {
    it("computes total as pricePerKg * weight rounded to 2 decimals", () => {
      expect(calculateLineTotal(380, 1)).toBe(380);
      expect(calculateLineTotal(380, 0.5)).toBe(190);
      expect(calculateLineTotal(380, 0.75)).toBe(285);
      expect(calculateLineTotal(420, 1.25)).toBe(525);
    });

    it("handles decimal precision safely", () => {
      expect(calculateLineTotal(100, 0.1 + 0.2)).toBe(30);
      expect(calculateLineTotal(33.33, 3)).toBe(99.99);
    });

    it("returns 0 for invalid inputs", () => {
      expect(calculateLineTotal(NaN, 1)).toBe(0);
      expect(calculateLineTotal(100, NaN)).toBe(0);
      expect(calculateLineTotal(100, -1)).toBe(0);
    });
  });

  describe("parseWeightInput", () => {
    it("parses valid weight >= 0.5", () => {
      expect(parseWeightInput("0.5")).toBe(0.5);
      expect(parseWeightInput("1")).toBe(1);
      expect(parseWeightInput("1.25")).toBe(1.25);
      expect(parseWeightInput("10.5")).toBe(10.5);
      expect(parseWeightInput(" 2.5 ")).toBe(2.5);
    });

    it("returns null for empty or invalid", () => {
      expect(parseWeightInput("")).toBe(null);
      expect(parseWeightInput("   ")).toBe(null);
      expect(parseWeightInput("abc")).toBe(null);
      expect(parseWeightInput("-1")).toBe(null);
      expect(parseWeightInput("0")).toBe(null);
      expect(parseWeightInput("0.4")).toBe(null);
    });

    it("rejects negative and zero", () => {
      expect(parseWeightInput("-0.5")).toBe(null);
      expect(parseWeightInput("0")).toBe(null);
    });
  });

  describe("clampWeight", () => {
    it("returns value when >= MIN_WEIGHT_KG", () => {
      expect(clampWeight(0.5)).toBe(0.5);
      expect(clampWeight(1)).toBe(1);
      expect(clampWeight(5)).toBe(5);
    });

    it("returns MIN_WEIGHT_KG when below or invalid", () => {
      expect(clampWeight(0)).toBe(MIN_WEIGHT_KG);
      expect(clampWeight(0.25)).toBe(MIN_WEIGHT_KG);
      expect(clampWeight(-1)).toBe(MIN_WEIGHT_KG);
      expect(clampWeight(NaN)).toBe(MIN_WEIGHT_KG);
    });
  });

  describe("isValidWeight", () => {
    it("returns true for finite number >= MIN_WEIGHT_KG", () => {
      expect(isValidWeight(0.5)).toBe(true);
      expect(isValidWeight(1)).toBe(true);
      expect(isValidWeight(1.25)).toBe(true);
    });

    it("returns false for invalid", () => {
      expect(isValidWeight(0)).toBe(false);
      expect(isValidWeight(-1)).toBe(false);
      expect(isValidWeight(NaN)).toBe(false);
      expect(isValidWeight(Infinity)).toBe(false);
    });
  });
});
