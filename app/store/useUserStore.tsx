import { SafeUser } from '../types';

interface UserStore {
	user: SafeUser | null;
	setUser: (user: SafeUser | null) => void;
	logout: () => void;
}

const eventEmitter = (): UserStore => {
	return {
		user: null,
		setUser: function (user: SafeUser | null) {
			this.user = user;
		},
		logout: function () {
			this.user = null;
		},
	};
};

export const useUserStore = eventEmitter();
