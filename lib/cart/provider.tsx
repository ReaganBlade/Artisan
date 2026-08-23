/**
 * Cart state management using cookies (no Redis).
 *
 * Cart data is serialized into a single JSON cookie. All mutations
 * go through the CartProvider so components never touch cookies directly.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types";

const CART_COOKIE = "artisan.cart";
const CART_MAX_ITEMS = 50;

// --- Cookie helpers -------------------------------------------------

function readCartCookie(): CartItem[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(new RegExp(`(?:^|; )${CART_COOKIE}=([^;]*)`));
  if (!match) return [];
  try {
    const decoded = decodeURIComponent(match[1]);
    const parsed = JSON.parse(decoded);
    if (!Array.isArray(parsed)) return [];
    // Validate each item has the required shape
    return parsed.filter(
      (item: unknown): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        "artwork_id" in item &&
        "quantity" in item &&
        typeof (item as CartItem).artwork_id === "string" &&
        typeof (item as CartItem).quantity === "number" &&
        (item as CartItem).quantity > 0,
    );
  } catch {
    return [];
  }
}

function writeCartCookie(items: CartItem[]): void {
  if (typeof document === "undefined") return;
  const json = JSON.stringify(items);
  // 30-day expiry
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${CART_COOKIE}=${encodeURIComponent(json)}; expires=${expires}; path=/; SameSite=Lax`;
}

// --- Context --------------------------------------------------------

export type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (artworkId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

// --- Provider -------------------------------------------------------

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCartCookie);

  // Persist whenever items change
  useEffect(() => {
    writeCartCookie(items);
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.artwork_id === item.artwork_id);
        if (existing) {
          // Increase quantity (don't duplicate)
          return prev.map((i) =>
            i.artwork_id === item.artwork_id
              ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
              : i,
          );
        }
        if (prev.length >= CART_MAX_ITEMS) return prev;
        return [...prev, { ...item, quantity: item.quantity ?? 1 }];
      });
    },
    [],
  );

  const removeItem = useCallback((artworkId: string) => {
    setItems((prev) => prev.filter((i) => i.artwork_id !== artworkId));
  }, []);

  const updateQuantity = useCallback((artworkId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.artwork_id === artworkId ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (artworkId: string) => items.some((i) => i.artwork_id === artworkId),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );

  const value: CartContextValue = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
    }),
    [items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// --- Hook -----------------------------------------------------------

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
