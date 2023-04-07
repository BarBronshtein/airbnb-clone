import { NextResponse } from 'next/server';

import { getCurUser } from '../../user';
import prisma from '@/app/db/prismadb';

interface IParams {
	listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
	const user = await getCurUser();
	if (!user) return NextResponse.error();

	const { listingId } = params;
	if (!listingId || typeof listingId !== 'string') throw new Error('Invalid ID');

	const favoriteIds = Array.isArray(user.favoriteIds)
		? [...user.favoriteIds, listingId]
		: [listingId];

	const updatedUser = await prisma.user.update({
		where: { id: user.id },
		data: { favoriteIds },
	});

	return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const user = await getCurUser();
	if (!user) return NextResponse.error();

	const { listingId } = params;
	if (!listingId || typeof listingId !== 'string') throw new Error('Invalid ID');

	const favoriteIds = user.favoriteIds.filter(id => id !== listingId);

	const updatedUser = await prisma.user.update({
		where: { id: user.id },
		data: { favoriteIds },
	});

	return NextResponse.json(updatedUser);
}
