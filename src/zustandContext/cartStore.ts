import { create } from 'zustand';

interface CartItem {
  itemId: string;
  quantity: number;
};

type State = {
	cart: CartItem[];
};

type Action = {
	addToCart: (cartItem: CartItem) => void;
  removeFromCart: (cartItem: CartItem) => void;
};

export const useCartStore = create<State & Action>((set) => ({
  cart: [],
  addToCart: (item: CartItem) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (item: CartItem) =>
    set((state) => ({ cart: state.cart.filter((i) => i.itemId !== item.itemId) })),
}));