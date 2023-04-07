import { NextResponse } from 'next/server';

import prisma from '@/app/db/prismadb';
import { getCurUser } from '../user';

export async function POST(req: Request) {
	const user = await getCurUser();
	if (!user) return NextResponse.error();

	const { listingId, startDate, endDate, totalPrice } = await req.json();
	if (!endDate || !startDate) return NextResponse.error();

	const listingAndReservation = await prisma.listing.update({
		where: { id: listingId },
		data: {
			reservations: {
				create: { userId: user.id, startDate, endDate, totalPrice },
			},
		},
	});
	return NextResponse.json(listingAndReservation);
}
