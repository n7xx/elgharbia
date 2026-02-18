import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCart } from "../../contexts/CartContext";

const TestConsumer = () => {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    total,
  } = useCart();
  return (
    <div>
      <span data-testid="count">{items.length}</span>
      <span data-testid="total-items">{totalItems}</span>
      <span data-testid="subtotal">{subtotal}</span>
      <span data-testid="total">{total}</span>
      <button
        onClick={() =>
          addItem({
            productId: "p-1",
            name: "Test",
            price: 100,
            unit: "كيلو",
            imageUrl: null,
          })
        }
      >
        Add
      </button>
      <button onClick={() => removeItem("p-1")}>Remove</button>
      <button onClick={() => updateQuantity("p-1", 2)}>Update</button>
    </div>
  );
};

describe("CartContext", () => {
  it("provides cart state and updates totalItems", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>,
    );
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("total-items").textContent).toBe("0");

    act(() => {
      screen.getByText("Add").click();
    });
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByTestId("total-items").textContent).toBe("1");

    act(() => {
      screen.getByText("Update").click();
    });
    expect(screen.getByTestId("total-items").textContent).toBe("1");

    act(() => {
      screen.getByText("Remove").click();
    });
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("throws when useCart is used outside CartProvider", () => {
    expect(() => render(<TestConsumer />)).toThrow(
      /useCart must be used within CartProvider/,
    );
  });

  it("calculates subtotal correctly for 0.5 kg (price per kg)", () => {
    const TestSubtotal = () => {
      const { addItem, subtotal } = useCart();
      return (
        <div>
          <span data-testid="subtotal">{subtotal}</span>
          <button
            onClick={() =>
              addItem(
                {
                  productId: "p-1",
                  name: "Test",
                  price: 380,
                  unit: "كيلو",
                  imageUrl: null,
                },
                0.5,
              )
            }
          >
            Add 0.5 kg
          </button>
        </div>
      );
    };
    render(
      <CartProvider>
        <TestSubtotal />
      </CartProvider>,
    );
    expect(screen.getByTestId("subtotal").textContent).toBe("0");
    act(() => {
      screen.getByText("Add 0.5 kg").click();
    });
    expect(screen.getByTestId("subtotal").textContent).toBe("190");
  });
});
