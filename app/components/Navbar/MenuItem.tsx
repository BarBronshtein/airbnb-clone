'use client';

interface Props {
	onClick: () => void;
	text: string;
}

const MenuItem: React.FC<Props> = ({ text, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="px-4 py-3 hover:bg-neutral-100 font-semibold transition"
		>
			{text}
		</div>
	);
};

export default MenuItem;
