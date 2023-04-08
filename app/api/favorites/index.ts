import prisma from '@/app/db/prismadb';

import { getCurUser } from '../user';

export default async function getFavoriteListings() {
	try {
		const user = await getCurUser();
		if (!user) return [];

		const favorites = await prisma.listing.findMany({
			where: { id: { in: [...user.favoriteIds] } },
		});

		return favorites.map(favorite => ({
			...favorite,
			createdAt: favorite.createdAt.toISOString(),
		}));
	} catch (err: any) {
		throw new Error(err);
	}
}
