'use client';

type Props = {
	children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
	return (
		<section className="max-w-[2500px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
			{children}
		</section>
	);
};

export default Container;
