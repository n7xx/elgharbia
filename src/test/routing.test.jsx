import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import Index from "../pages/Index";
import Products from "../pages/Products";
import Offers from "../pages/Offers";
import NotFound from "../pages/NotFound";

const queryClient = new QueryClient();

function renderWithProviders(initialEntries = ["/"]) {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <CartProvider>
            <MemoryRouter initialEntries={initialEntries}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MemoryRouter>
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

describe("Routing", () => {
  it("renders Index at /", () => {
    renderWithProviders(["/"]);
    expect(screen.getByRole("heading", { name: /ملوك اللحمة البلدي/i })).toBeInTheDocument();
  });

  it("renders NotFound for unknown route", () => {
    renderWithProviders(["/unknown-route"]);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText(/الصفحة غير موجودة/i)).toBeInTheDocument();
  });

  it("renders Products at /products", () => {
    renderWithProviders(["/products"]);
    expect(screen.getByText(/منتجاتنا/i)).toBeInTheDocument();
  });

  it("renders Offers at /offers", () => {
    renderWithProviders(["/offers"]);
    expect(screen.getByText(/عروض الغربية/i)).toBeInTheDocument();
  });
});
