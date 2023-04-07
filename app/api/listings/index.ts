import prisma from '@/app/db/prismadb';
import { SafeListing } from '@/app/types';

export async function getListings(): Promise<SafeListing[]> {
	try {
		const listings = await prisma.listing.findMany({
			orderBy: { createdAt: 'desc' },
		});
		return listings.map(listing => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));
	} catch (err: any) {
		throw new Error(err);
	}
}

interface IParams {
	listingId?: string;
}

export async function getListingById(params: IParams) {
	try {
		const { listingId } = params;
		const listing = await prisma.listing.findUnique({
			where: { id: listingId },
			include: { user: true },
		});

		if (!listing) return null;

		return {
			...listing,
			createdAt: listing.createdAt.toISOString(),
			user: {
				...listing.user,
				createdAt: listing.user.createdAt.toISOString(),
				updatedAt: listing.user.updatedAt.toISOString(),
				emailVerified: listing.user.emailVerified?.toISOString() || null,
			},
		};
	} catch (err: any) {
		throw new Error(err);
	}
}
