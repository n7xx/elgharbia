import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../../pages/NotFound";

describe("NotFound", () => {
  it("renders 404 and back link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText(/الصفحة غير موجودة/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /العودة للرئيسية/i })).toHaveAttribute("href", "/");
  });
});
