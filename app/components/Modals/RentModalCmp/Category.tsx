'use client';

import { categories } from '@/app/services/icon.service';
import Heading from '../../Heading';
import CategoryInput from '../../Inputs/CategoryInput';
import Steps from '../../STEPS/Steps';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
	setCustomValue: (id: string, val: string) => void;
	category: string;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
}

const Category: React.FC<Props> = ({
	setCustomValue,
	category,
	errors,
	register,
}) => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map(item => (
					<div className="col-span-1" key={item.title}>
						<CategoryInput
							required
							register={register}
							errors={errors}
							onClick={category => setCustomValue('category', category)}
							selected={item.title === category}
							title={item.title}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
			<hr />
			<Steps
				values={['Category', 'Location', 'Info', 'Images', 'Description', 'Price']}
				curStepIdx={0}
			/>
		</section>
	);
};

export default Category;
