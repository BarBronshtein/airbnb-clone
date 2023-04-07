import prisma from '@/app/db/prismadb';
import { SafeListing } from '@/app/types';

export default async function getListings(): Promise<SafeListing[]> {
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
