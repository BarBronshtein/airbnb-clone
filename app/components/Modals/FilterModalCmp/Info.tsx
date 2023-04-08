'use client';

import Heading from '../../Heading';
import Counter from '../../Inputs/Counter';
import Steps from '../../STEPS/Steps';

interface Props {
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	setValue: {
		guestCount: (val: number) => void;
		roomCount: (val: number) => void;
		bathroomCount: (val: number) => void;
	};
}

const Info: React.FC<Props> = ({
	bathroomCount,
	guestCount,
	roomCount,
	setValue,
}) => {
	return (
		<section className="flex flex-col gap-8">
			<Heading title="More information?" subtitle="Find your perfect place!?" />
			<Counter
				onChange={value => setValue['guestCount'](value)}
				value={guestCount}
				title="Guests"
				subtitle="How many guests are coming?"
			/>
			<hr />
			<Counter
				onChange={value => setValue['roomCount'](value)}
				value={roomCount}
				title="Rooms"
				subtitle="How many rooms do you need?"
			/>
			<hr />
			<Counter
				onChange={value => setValue['bathroomCount'](value)}
				value={bathroomCount}
				title="Bathrooms"
				subtitle="How many bathrooms do you need?"
			/>
			<hr />
			<Steps values={['Location', 'Date', 'Info']} curStepIdx={2} />
		</section>
	);
};

export default Info;
