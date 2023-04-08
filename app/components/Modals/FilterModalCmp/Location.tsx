'use client';

import { Dispatch, SetStateAction, useMemo } from 'react';
import Heading from '../../Heading';
import CountrySelect, { CountrySelectValue } from '../../Inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Steps from '../../STEPS/Steps';

interface Props {
	setLocation: Dispatch<SetStateAction<CountrySelectValue | undefined>>;
	location: CountrySelectValue;
}

const Location: React.FC<Props> = ({ location, setLocation }) => {
	const Map = useMemo(
		() => dynamic(() => import('../../Map'), { ssr: false }),
		[location]
	);

	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Where do you wanna go?"
				subtitle="Find the perfect location!"
			/>
			<CountrySelect value={location} onChange={value => setLocation(value)} />
			<hr />
			<Map center={location?.latlng} />
			<hr />
			<Steps values={['Location', 'Date', 'Info']} curStepIdx={0} />
		</section>
	);
};

export default Location;
