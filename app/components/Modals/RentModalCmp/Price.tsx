'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import Heading from '../../Heading';
import Input from '../../Inputs/Input';
import Steps from '../../STEPS/Steps';

interface Props {
	errors: FieldErrors<FieldValues>;
	register: UseFormRegister<FieldValues>;
	isLoading: boolean;
}

const Price: React.FC<Props> = ({ errors, register, isLoading }) => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Now, set your price"
				subtitle="How much do you charge per night?"
			/>
			<Input
				id="price"
				label="Price"
				type="number"
				register={register}
				errors={errors}
				formatPrice
				disabled={isLoading}
				required
			/>
			<Steps
				values={['Category', 'Location', 'Info', 'Images', 'Description', 'Price']}
				curStepIdx={5}
			/>
		</section>
	);
};

export default Price;
