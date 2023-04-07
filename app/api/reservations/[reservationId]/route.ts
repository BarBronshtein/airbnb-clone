import { NextResponse } from 'next/server';
import { getCurUser } from '../../user';

import prisma from '@/app/db/prismadb';

interface IParams {
	reservationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const user = await getCurUser();
	if (!user) return NextResponse.error();

	const { reservationId } = params;
	if (!reservationId || typeof reservationId !== 'string') {
		throw new Error('Invalid ID');
	}

	const reservation = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [{ userId: user.id }, { listing: { userId: user.id } }],
		},
	});
	return NextResponse.json(reservation);
}
