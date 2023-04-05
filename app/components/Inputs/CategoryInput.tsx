'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { IconType } from 'react-icons';

interface Props {
	onClick: (value: string) => void;
	selected?: boolean;
	title: string;
	icon: IconType;
	required: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
}

const CategoryInput: React.FC<Props> = ({
	icon: Icon,
	onClick,
	title,
	selected,
	register,
	required,
	errors,
}) => {
	return (
		<div
			onClick={() => onClick(title)}
			{...register('category', { required })}
			className={`flex flex-col gap-3 rounded-xl border-2 p-4 hover:border-black transition cursor-pointer ${
				selected ? 'border-black' : 'border-neutral-200'
			} ${errors['category'] ? 'border-rose-500 focus:border-rose-500' : ''}`}
		>
			<Icon size={30} />
			<p className="font-semibold">{title}</p>
		</div>
	);
};

export default CategoryInput;
