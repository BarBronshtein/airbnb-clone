'use client';

import Heading from '../../Heading';

const Location = () => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Where is your place located?"
				subtitle="Help guests find you!"
			/>
			<CountrySelect
				value={location}
				onChange={value => setCustomValue('location', value)}
			/>
			<Map center={location?.latlng} />
		</section>
	);
};

export default Location;
