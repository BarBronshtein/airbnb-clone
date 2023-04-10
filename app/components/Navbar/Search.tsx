'use client';

import { useCountries } from '@/app/hooks/useCountries';
import { useSearch } from '@/app/store/useSearch';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';

const getDurationLabel = (
	startDate?: string | null,
	endDate?: string | null
) => {
	if (startDate && endDate) {
		const daysDiff = differenceInDays(
			new Date(startDate || 0),
			new Date(endDate || 0)
		);

		return `${daysDiff + 1} Days`;
	}
	return 'Any Week';
};

const Search = () => {
	const searchModal = useSearch();
	const params = useSearchParams();
	const { getByValue } = useCountries();

	const locationValue = params?.get('locationValue');
	const startDate = params?.get('startDate');
	const endDate = params?.get('endDate');
	const guestCount = params?.get('guestCount');
	const locationLabel = locationValue
		? getByValue(locationValue)?.name
		: 'Anywhere';
	const durationLabel = getDurationLabel(startDate, endDate);
	const guestLabel = guestCount ? `${guestCount} Guests` : `Add Guests`;

	return (
		<div
			onClick={searchModal.onOpen}
			className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
		>
			<div className="flex flex-row items-center justify-between">
				<div className="text-sm font-semibold px-6 lg:px-4">{locationLabel}</div>
				<div className="hidden sm:block text-sm font-semibold px-6 lg:px-4 border-x-[1px] flex-1 text-center">
					{durationLabel}
				</div>
				<div className="flex flex-row items-center text-sm pl-6 lg:pl-4 pr-2 text-gray-600 gap-3">
					<div className="hidden sm:block">{guestLabel}</div>
					<div className="p-2 bg-rose-500 rounded-full text-white">
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
