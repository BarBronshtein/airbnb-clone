'use client';

import { Range } from 'react-date-range';
import { httpService } from '@/app/services/http.service';
import { useLogin } from '@/app/store/useLogin';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Calendar from '../Inputs/Calendar';
import Button from '../Button';

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection',
};

interface Props {
	listing: SafeListing;
	curUser: SafeUser | null;
	reservations: SafeReservation[];
}

const ListingReservation: React.FC<Props> = ({
	listing,
	curUser,
	reservations,
}) => {
	const router = useRouter();
	const loginModal = useLogin();

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	useEffect(() => {
		let dayCount: number | undefined;
		if (dateRange.startDate && dateRange.endDate) {
			dayCount =
				differenceInCalendarDays(dateRange.endDate, dateRange.startDate) + 1;
		}
		if (dayCount) setTotalPrice(dayCount * listing.price);
		else setTotalPrice(listing.price);
	}, [listing.price, dateRange.startDate, dateRange.endDate]);

	const onCreateReservation = useCallback(() => {
		if (!curUser) return loginModal.onOpen();
		setIsLoading(true);
		httpService
			.post('/api/reservations', {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing.id,
			})
			.then(() => {
				toast.success('Listing reserved');
				setDateRange(initialDateRange);
				router.push('/trips');
			})
			.catch(() => {
				toast.error('Something went wrong');
			})
			.finally(() => setIsLoading(false));
	}, [
		listing.id,
		dateRange.startDate,
		dateRange.endDate,
		totalPrice,
		loginModal,
		curUser,
		router,
	]);

	const disabledDates = () => {
		let dates: Date[] = [];
		reservations.forEach(reservation => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...range];
		});
		return dates;
	};

	return (
		<div className="bg-white rounded-xl border-[1px] overflow-hidden border-neutral-500">
			<div className="flex flex-row items-center gap-1 p-4">
				<h2 className="text-2xl font-semibold">$ {listing.price}</h2>
				<span className="font-light text-neutral-600">night</span>
			</div>
			<hr />
			<Calendar
				value={dateRange}
				disabledDates={disabledDates()}
				onChange={value => setDateRange(value.selection)}
			/>
			<hr />
			<div className="p-4">
				<Button
					disabled={isLoading}
					label="Reserve"
					onClick={onCreateReservation}
				/>
			</div>
			<div className="p-4 flex flex-row item-center justify-between font-semibold text-lg">
				<h3>Total</h3>
				<h3>$ {totalPrice}</h3>
			</div>
		</div>
	);
};

export default ListingReservation;
