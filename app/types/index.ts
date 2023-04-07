import { Listing, Reservation, User } from '@prisma/client';

export type SafeUser = Omit<
	User,
	'createdAt' | 'updatedAt' | 'emailVerified'
> & { createdAt: string; updatedAt: string; emailVerified: string | null };

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
	T extends (...args: any) => Promise<infer R> ? R : any;

export type SafeListing = Omit<Listing, 'createdAt'> & { createdAt: string };

export type SafeReservation = Omit<
	Reservation,
	'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
	createdAt: string;
	startDate: string;
	endDate: string;
	listing: SafeListing;
};
