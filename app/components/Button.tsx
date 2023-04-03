'use client';

import { IconType } from 'react-icons/lib';

interface Props {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	Icon?: IconType;
}

const Button: React.FC<Props> = ({
	label,
	onClick,
	disabled,
	Icon,
	outline,
	small,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`relative disabled:opcaity-70 disabled:cursor-not-allowed rounded-lg hover:opcaity-80 transition w-full ${
				outline
					? 'bg-white border-black text-black'
					: 'bg-rose-500 border-rose-500 text-white'
			} ${
				small
					? 'py-1 text-sm font-light border-[1px]'
					: 'py-3 text-md font-semibold border-[2px]'
			}`}
		>
			{Icon && <Icon className="absolute left-4 top-3" />}
			{label}
		</button>
	);
};

export default Button;
