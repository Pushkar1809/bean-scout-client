import { create } from 'zustand';

export interface CartItem {
  itemId: string;
  quantity: number;
};

type State = {
	cart: CartItem[];
};

type Action = {
	addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<State & Action>((set) => ({
  cart: [],
  addToCart: (itemId: string) => set((state) => {
    const itemInCart = state.cart.find((i) => i.itemId === itemId);
    if (itemInCart) {
      return {
        cart: state.cart.map((i) => {
          if (i.itemId === itemId) {
            return { ...i, quantity: i.quantity + 1 };
          }
          return i;
        }),
      };
    }
    return { cart: [...state.cart, {
      itemId: itemId,
      quantity: 1,
    }] };
  }),
  removeFromCart: (itemId: string) =>
    set((state) => {
      const itemInCart = state.cart.find((i) => i.itemId === itemId);
      if (itemInCart && itemInCart.quantity && itemInCart.quantity > 1) {
        return {
          cart: state.cart.map((i) => {
            if (i.itemId === itemId) {
              return { ...i, quantity: i.quantity - 1 };
            }
            return i;
          }),
        };
      }
      return { cart: state.cart.filter((i) => i.itemId !== itemId) };
    }),
  clearCart: () => set({ cart: [] }),
}));