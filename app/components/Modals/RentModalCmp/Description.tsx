'use client';

import Heading from '../../Heading';
import Steps from '../../STEPS/Steps';

const Description = () => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Where is your place located?"
				subtitle="Help guests find you!"
			/>
			<Steps
				values={['Category', 'Location', 'Info', 'Images', 'Description', 'Price']}
				curStepIdx={4}
			/>
		</section>
	);
};

export default Description;
