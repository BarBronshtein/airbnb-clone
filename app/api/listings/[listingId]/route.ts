import { NextResponse } from 'next/server';

import prisma from '@/app/db/prismadb';
import { getCurUser } from '../../user';

interface IParams {
	listingId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const user = await getCurUser();
	if (!user) return NextResponse.error();

	const { listingId } = params;
	if (!listingId || typeof listingId !== 'string') return NextResponse.error();

	const listing = await prisma.listing.deleteMany({
		where: {
			id: listingId,
			userId: user.id,
		},
	});
	return NextResponse.json(listing);
}
