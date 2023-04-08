import prisma from '@/app/db/prismadb';
import { SafeListing } from '@/app/types';

export interface IListingsParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
}

export async function getListings(
	params: IListingsParams
): Promise<SafeListing[]> {
	try {
		const {
			userId,
			bathroomCount,
			category,
			endDate,
			guestCount,
			locationValue,
			roomCount,
			startDate,
		} = params;
		let query: any = {};

		if (userId) query.userId = userId;
		if (category) query.category = category;
		if (locationValue) query.locationValue = locationValue;
		if (guestCount) query.guestCount = { gte: +guestCount };
		if (roomCount) query.roomCount = { gte: +roomCount };
		if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: { gte: startDate },
								startDate: { lte: startDate },
							},
							{
								startDate: { lte: endDate },
								endDate: { gte: endDate },
							},
						],
					},
				},
			};
		}

		const listings = await prisma.listing.findMany({
			where: query,
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
