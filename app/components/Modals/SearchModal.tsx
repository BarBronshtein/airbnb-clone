'use client';

import { useSearch } from '@/app/store/useSearch';
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { Range, RangeKeyDict } from 'react-date-range';
import { CountrySelectValue } from '../Inputs/CountrySelect';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Location from './FilterModalCmp/Location';
import DateCmp from './FilterModalCmp/Date';
import Info from './FilterModalCmp/Info';

enum STEPS {
	LOCATION,
	DATE,
	INFO,
}

const SearchModal = () => {
	const router = useRouter();
	const params = useSearchParams();
	const searchModal = useSearch();

	const [step, setStep] = useState(STEPS.LOCATION);
	const [location, setLocation] = useState<CountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});
	const onBack = useCallback(() => {
		setStep(val => val - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep(val => val + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) return onNext();

		let query = {};

		if (params) query = qs.parse(params.toString());

		const updatedQuery: any = {
			...query,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}
		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{ url: '/', query: updatedQuery },
			{ skipNull: true }
		);

		setStep(STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		step,
		searchModal,
		location,
		router,
		guestCount,
		bathroomCount,
		roomCount,
		onNext,
		params,
		dateRange.startDate,
		dateRange.endDate,
	]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) return 'Search';
		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) return;
		return 'Back';
	}, [step]);

	let body = (
		<Location
			location={location as CountrySelectValue}
			setLocation={setLocation}
		/>
	);

	if (step === STEPS.DATE) {
		body = (
			<DateCmp
				dateRange={dateRange}
				onChange={(val: RangeKeyDict) => setDateRange(val.selection)}
			/>
		);
	}
	if (step === STEPS.INFO) {
		body = (
			<Info
				guestCount={guestCount}
				roomCount={roomCount}
				bathroomCount={bathroomCount}
				setValue={{
					guestCount: setGuestCount,
					roomCount: setRoomCount,
					bathroomCount: setBathroomCount,
				}}
			/>
		);
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSubmit={onSubmit}
			title="Filters"
			actionLabel={actionLabel}
			secondaryAction={step !== STEPS.LOCATION ? onBack : undefined}
			secondaryLabel={secondaryActionLabel}
			body={body}
		/>
	);
};

export default SearchModal;
