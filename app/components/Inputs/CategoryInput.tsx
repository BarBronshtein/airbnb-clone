'use client';

import { IconType } from 'react-icons';

interface Props {
	onClick: (value: string) => void;
	selected?: boolean;
	title: string;
	icon: IconType;
}

const CategoryInput: React.FC<Props> = ({
	icon: Icon,
	onClick,
	title,
	selected,
}) => {
	return (
		<div
			onClick={() => onClick(title)}
			className={`flex flex-col gap-3 rounded-xl border-2 p-4 hover:border-black transition cursor-pointer ${
				selected ? 'border-black' : 'border-neutral-200'
			}`}
		>
			<Icon size={30} />
			<p className="font-semibold">{title}</p>
		</div>
	);
};

export default CategoryInput;
