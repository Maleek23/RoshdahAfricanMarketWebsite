import { createContext, useContext, useState, type ReactNode } from "react";

interface CartState {
  count: number;
  add: (n?: number) => void;
}

const CartContext = createContext<CartState>({ count: 0, add: () => {} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const add = (n = 1) => setCount((c) => c + n);
  return <CartContext.Provider value={{ count, add }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
