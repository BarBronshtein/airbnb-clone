import { httpService } from '../services/http.service';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '../types';
import { useLogin } from '../store/useLogin';

interface IUserFavorite {
	listingId: string;
	user?: SafeUser | null;
}

const useFavorite = ({ listingId, user }: IUserFavorite) => {
	const router = useRouter();
	const loginModal = useLogin();

	const hasFavorited = useMemo(() => {
		const list = user?.favoriteIds || [];
		return list.includes(listingId);
	}, [user, listingId]);

	const toggleFavorite = useCallback(
		async (ev: React.MouseEvent<HTMLButtonElement>) => {
			ev.stopPropagation();
			if (!user) loginModal.onOpen();
			try {
				const req = hasFavorited
					? await httpService.delete(`/api/favorites/${listingId}`)
					: await httpService.post(`/api/favorites/${listingId}`);
				router.refresh();
				toast.success('Success');
			} catch (err) {
				toast.error('Something went wrong');
			}
		},
		[listingId, hasFavorited, user, loginModal, router]
	);
	return { hasFavorited, toggleFavorite };
};

export default useFavorite;
