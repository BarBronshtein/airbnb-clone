'use client';
import Heading from '../../Heading';
import Steps from '../../STEPS/Steps';
const Price = () => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Where is your place located?"
				subtitle="Help guests find you!"
			/>
			<Steps
				values={['Category', 'Location', 'Info', 'Images', 'Description', 'Price']}
				curStepIdx={5}
			/>
		</section>
	);
};

export default Price;
