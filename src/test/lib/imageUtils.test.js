import { describe, it, expect } from "vitest";
import { validateImageSize, MAX_IMAGE_UPLOAD_BYTES } from "../../lib/imageUtils";

describe("imageUtils", () => {
  describe("MAX_IMAGE_UPLOAD_BYTES", () => {
    it("is 5MB", () => {
      expect(MAX_IMAGE_UPLOAD_BYTES).toBe(5 * 1024 * 1024);
    });
  });

  describe("validateImageSize", () => {
    it("returns invalid for non-File", () => {
      expect(validateImageSize(null).valid).toBe(false);
      expect(validateImageSize(undefined).valid).toBe(false);
      expect(validateImageSize("not a file").valid).toBe(false);
      expect(validateImageSize({ size: 100 }).valid).toBe(false);
    });

    it("returns invalid when file exceeds max size", () => {
      const bigFile = new File(["x"], "big.jpg", { type: "image/jpeg" });
      Object.defineProperty(bigFile, "size", { value: MAX_IMAGE_UPLOAD_BYTES + 1 });
      const result = validateImageSize(bigFile);
      expect(result.valid).toBe(false);
      expect(result.error).toMatch(/ميجابايت/);
    });

    it("returns valid when file is within limit", () => {
      const smallFile = new File(["x"], "small.jpg", { type: "image/jpeg" });
      Object.defineProperty(smallFile, "size", { value: 1024 });
      expect(validateImageSize(smallFile).valid).toBe(true);
    });

    it("returns valid when file size equals limit", () => {
      const atLimit = new File(["x"], "atlimit.jpg", { type: "image/jpeg" });
      Object.defineProperty(atLimit, "size", { value: MAX_IMAGE_UPLOAD_BYTES });
      expect(validateImageSize(atLimit).valid).toBe(true);
    });
  });
});
