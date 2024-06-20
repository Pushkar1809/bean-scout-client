import { create } from "zustand";
import { User } from "../types/user";

type State = {
	user: User | null;
};

type Action = {
	setUser: (user: User) => void;
};

export const useUserStore = create<State & Action>((set) => ({
		user: null,
		setUser: (user: User) => set({ user }),
	}
));
