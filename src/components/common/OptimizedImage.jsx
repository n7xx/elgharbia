import { useState } from "react";
import { Beef } from "lucide-react";

/**
 * Lazy-loaded image with fixed aspect ratio (no layout shift), fallback on error.
 * Use for product and offer images.
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  aspectRatio = "4/3",
  FallbackIcon = Beef,
  objectFit = "cover",
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${className}`}
        style={{ aspectRatio }}
      >
        <FallbackIcon className="w-10 h-10 text-muted-foreground/30" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-muted ${className}`}
      style={{ aspectRatio }}
    >
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-muted"
          aria-hidden
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        style={{ objectFit }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
