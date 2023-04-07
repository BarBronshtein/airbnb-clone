'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '../types';
import useFavorite from '../hooks/useFavorite';

interface Props {
	listingId: string;
	user?: SafeUser | null;
}

const HeartButton: React.FC<Props> = ({ listingId, user }) => {
	const { hasFavorited, toggleFavorite } = useFavorite({ listingId, user });

	return (
		<button
			onClick={toggleFavorite}
			type="button"
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			<AiOutlineHeart
				size={28}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>
			<AiFillHeart
				size={24}
				className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
			/>
		</button>
	);
};

export default HeartButton;
