import { NextResponse } from 'next/server';

import prisma from '@/app/db/prismadb';
import { getCurUser } from '../user';

type BodyPostReq = {
	category: string;
	location: any;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	imageSrc: string[];
	price: number;
	title: string;
	description: string;
};

export async function POST(req: Request) {
	const curUser = await getCurUser();
	if (!curUser) return NextResponse.error();

	const body: BodyPostReq = await req.json();

	const arr = Object.values(body);
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i]) return NextResponse.error();
	}

	const {
		category,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		imageSrc,
		price,
		title,
		description,
	} = body;

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			bathroomCount,
			category,
			imageSrc,
			guestCount,
			locationValue: location.value,
			price: +price,
			roomCount,
			userId: curUser.id,
		},
	});

	return NextResponse.json(listing);
}
