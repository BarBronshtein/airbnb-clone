'use client';

interface Props {
	title: string;
	subtitle?: string;
	center?: boolean;
}

const Heading: React.FC<Props> = ({ title, center, subtitle }) => {
	return (
		<header className={center ? 'text-center' : 'text-start'}>
			<h3 className="text-2xl font-bold">{title}</h3>
			<p className="fontlight text-neutral-500 mt-2">{subtitle}</p>
		</header>
	);
};

export default Heading;
