/** Max file size for image uploads (5MB). Use when validating before upload. */
export const MAX_IMAGE_UPLOAD_BYTES = 5 * 1024 * 1024;

/**
 * Validates that a file is within the allowed size limit.
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageSize(file) {
  if (!file || !(file instanceof File)) {
    return { valid: false, error: "Invalid file" };
  }
  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return {
      valid: false,
      error: `الحد الأقصى لحجم الصورة ${MAX_IMAGE_UPLOAD_BYTES / 1024 / 1024} ميجابايت`,
    };
  }
  return { valid: true };
}
