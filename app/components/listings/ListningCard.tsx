'use client';

import { useCountries } from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

interface Props {
	data: Listing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	actionLabel?: string;
	actionId: string;
	user: SafeUser | null;
	disabled?: boolean;
}

const ListningCard: React.FC<Props> = ({
	data,
	actionId = '',
	user,
	actionLabel,
	onAction,
	disabled,
	reservation,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (disabled) return;
			onAction?.(actionId);
		},
		[disabled, onAction, actionId]
	);

	const price = useMemo(() => {
		if (reservation) return reservation.totalPrice;

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) return null;

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, 'PP')} - ${format(end, 'PP')}`;
	}, [reservation]);

	return (
		<article
			onClick={() => router.push(`/listings/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full">
				<div className="aspect-sqaure w-full relative overflow-hidden rounded-xl">
					{/* Change Image to a carousel component */}
					{/* <Image
            fill
						alt="Listing"
						src={data.imageSrc}
						className="object-cover h-full w-full group-hover:scale-110 transition"
					/> */}
				</div>
			</div>
			{data.title}
		</article>
	);
};

export default ListningCard;
