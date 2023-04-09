'use client';

import { useMemo } from 'react';
import Heading from '../../Heading';
import CountrySelect, { CountrySelectValue } from '../../Inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Steps from '../../STEPS/Steps';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
	setCustomValue: (id: string, val: any) => void;
	location: CountrySelectValue;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
}

const Location: React.FC<Props> = ({
	location,
	setCustomValue,
	errors,
	register,
}) => {
	const Map = useMemo(
		() => dynamic(() => import('../../Map'), { ssr: false }),
		[location]
	);
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Where is your place located?"
				subtitle="Help guests find you!"
			/>
			<CountrySelect
				value={location}
				errors={errors}
				register={register}
				onChange={value => setCustomValue('location', value)}
			/>
			<hr />
			<Map center={location?.latlng} />
			<hr />
			<Steps
				values={['Category', 'Location', 'Info', 'Images', 'Description', 'Price']}
				curStepIdx={1}
			/>
		</section>
	);
};

export default Location;
