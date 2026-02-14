import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OptimizedImage from "../../components/common/OptimizedImage";

describe("OptimizedImage", () => {
  it("renders fallback when src is missing", () => {
    render(<OptimizedImage alt="Product" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders fallback when src is empty string", () => {
    render(<OptimizedImage src="" alt="Product" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders img with loading lazy and correct alt when src is provided", () => {
    render(<OptimizedImage src="https://example.com/img.jpg" alt="Test product" />);
    const img = screen.getByRole("img", { name: "Test product" });
    expect(img).toHaveAttribute("src", "https://example.com/img.jpg");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
  });

  it("handles broken image source with onError", () => {
    render(<OptimizedImage src="https://example.com/broken.jpg" alt="Broken" />);
    const img = screen.getByRole("img", { name: "Broken" });
    expect(img).toBeInTheDocument();
    fireEvent.error(img);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("uses fixed aspect ratio container to prevent layout shift", () => {
    const { container } = render(
      <OptimizedImage src="https://example.com/img.jpg" alt="Product" aspectRatio="4/3" />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toBeInstanceOf(HTMLDivElement);
    expect(wrapper.style.aspectRatio).toBe("4/3");
  });
});
