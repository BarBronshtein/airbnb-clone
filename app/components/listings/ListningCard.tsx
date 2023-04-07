'use client';

import { useCountries } from '@/app/hooks/useCountries';
import { SafeListing, SafeUser } from '@/app/types';
import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import HeartButton from '../HeartButton';
import Button from '../Button';
import HomeCarousel from '../carousel/HomeCarousel';

interface Props {
	data: SafeListing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	actionLabel?: string;
	actionId?: string;
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
			<div className="flex flex-col gap-2 w-full relative">
				<div className="aspect-sqaure w-full overflow-hidden rounded-xl carousel h-[250px]">
					<HomeCarousel imageSrc={data.imageSrc} id={data.id} />
					<div className="absolute top-3 left-3">
						<HeartButton listingId={data.id} user={user} />
					</div>
				</div>
			</div>

			<h3 className="font-semibold text-lg">
				{location?.region}, {location?.name}
			</h3>
			<p className="font-light text-neutral-500">
				{reservationDate || data.category}
			</p>
			<div className="flex flex-row items-center gap-1">
				<h3 className="font-semibold">$ {price}</h3>
				{!reservation ? <p className="font-light">night</p> : null}
			</div>
			{onAction && actionLabel && (
				<Button
					disabled={disabled}
					small
					label={actionLabel}
					onClick={handleCancel}
				/>
			)}
		</article>
	);
};

export default ListningCard;
