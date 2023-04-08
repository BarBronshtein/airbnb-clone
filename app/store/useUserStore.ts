import { SafeUser } from '../types';

interface UserStore {
	user: SafeUser | null;
	setUser: (user: SafeUser | null) => void;
	logout: () => void;
}

function eventEmitter(): UserStore {
	let user = null;
	return {
		user,
		setUser: function (user: SafeUser | null) {
			user = user;
		},
		logout: function () {
			user = null;
		},
	};
}

export const useUserStore = eventEmitter();
