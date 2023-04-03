import { create } from 'zustand';

interface LoginStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useLogin = create<LoginStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
