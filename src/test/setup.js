import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

class MockIntersectionObserver {
  observe = () => null;
  unobserve = () => null;
  disconnect = () => null;
}
window.IntersectionObserver = MockIntersectionObserver;

class MockResizeObserver {
  observe = () => null;
  unobserve = () => null;
  disconnect = () => null;
}
window.ResizeObserver = MockResizeObserver;
