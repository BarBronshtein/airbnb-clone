'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import Heading from '../../Heading';
import Input from '../../Inputs/Input';
import Steps from '../../STEPS/Steps';

interface Props {
	errors: FieldErrors<FieldValues>;
	register: UseFormRegister<FieldValues>;
}

const Description: React.FC<Props> = ({ errors, register }) => {
	let isLoading = false;
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="How would you describe your place?"
				subtitle="Short and sweet works best!"
			/>
			<Input
				id="title"
				label="Title"
				errors={errors}
				register={register}
				disabled={isLoading}
				required
			/>
			<hr />
			<Input
				id="description"
				label="Description"
				errors={errors}
				register={register}
				disabled={isLoading}
				required
			/>
			<hr />
			<Steps
				values={['Category', 'Location', 'Info', 'Images', 'Description', 'Price']}
				curStepIdx={4}
			/>
		</section>
	);
};

export default Description;
