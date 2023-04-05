'use client';

import { useMemo, useState } from 'react';
import Modal from './Modal';
import { useRent } from '@/app/store/useRent';
import Heading from '../Heading';

import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import Location from './RentModalCmp/Location';
import Info from './RentModalCmp/Info';
import Images from './RentModalCmp/Images';
import Steps from '../STEPS/Steps';
import Category from './RentModalCmp/Category';

enum STEPS {
	CATEGORY,
	LOCATION,
	INFO,
	IMAGES,
	DESCRIPTION,
	PRICE,
}

const RentModal = () => {
	const rentModal = useRent();
	const [step, setStep] = useState(STEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: [],
			price: 1,
			title: '',
			subtitle: '',
		},
	});

	const category = watch('category');
	const location = watch('location');
	const guestCount = watch('guestCount');
	const roomCount = watch('roomCount');
	const bathroomCount = watch('bathroomCount');
	const imageSrc = watch('imageSrc');

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep(value => value - 1);
	};
	const onNext = () => {
		setStep(value => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) return 'Create';
		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) return;
		return 'Back';
	}, [step]);

	let body = <Category setCustomValue={setCustomValue} category={category} />;

	if (step === STEPS.LOCATION) {
		body = <Location setCustomValue={setCustomValue} location={location} />;
	}

	if (step === STEPS.INFO) {
		body = (
			<Info
				setCustomValue={setCustomValue}
				bathroomCount={bathroomCount}
				roomCount={roomCount}
				guestCount={guestCount}
			/>
		);
	}

	if (step === STEPS.IMAGES) {
		body = <Images imageSrc={imageSrc} setCustomValue={setCustomValue} />;
	}

	if (step === STEPS.DESCRIPTION) {
	}

	if (step === STEPS.PRICE) {
	}

	return (
		<Modal
			isOpen={rentModal.isOpen}
			onSubmit={onNext}
			actionLabel={actionLabel}
			secondaryLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			title="BeMyGuest your home!"
			onClose={rentModal.onClose}
			body={body}
		/>
	);
};

export default RentModal;
