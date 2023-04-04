'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Props {
	title: string;
	subtitle: string;
	value: number;
	onChange: (value: number) => void;
}

const Counter: React.FC<Props> = ({ onChange, subtitle, title, value }) => {
	const onAdd = useCallback(() => {
		onChange(value + 1);
	}, [onChange, value]);

	const onReduce = useCallback(() => {
		if (value === 1) return;
		onChange(value - 1);
	}, [onChange, value]);
	return (
		<div className="flex flex-row items-center justify-between">
			<div className="flex flex-col">
				<h4 className="font-medium">{title}</h4>
				<p className="font-light text-gray-600">{subtitle}</p>
			</div>
			<div className="flex flex-row items-center gap-4">
				<button
					type="button"
					onClick={onReduce}
					className="w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 items-center justify-center cursor-pointer transition hover:opcaity-80"
				>
					<AiOutlineMinus className="inline" />
				</button>
				<span className="font-light text-xl text-neutral-600">{value}</span>
				<button
					type="button"
					onClick={onAdd}
					className="w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 items-center justify-center cursor-pointer transition hover:opcaity-80"
				>
					<AiOutlinePlus className="inline" />
				</button>
			</div>
		</div>
	);
};

export default Counter;
