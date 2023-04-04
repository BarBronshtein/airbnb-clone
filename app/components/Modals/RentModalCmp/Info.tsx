'use client';

import Heading from '../../Heading';
import Counter from '../../Inputs/Counter';

interface Props {
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	setCustomValue: (id: string, val: any) => void;
}

const Info: React.FC<Props> = ({
	bathroomCount,
	guestCount,
	roomCount,
	setCustomValue,
}) => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Share some basics about your place?"
				subtitle="What amenities do you have?"
			/>
			<Counter
				onChange={value => setCustomValue('guestCount', value)}
				value={guestCount}
				title="Guests"
				subtitle="How many guests do you allow?"
			/>
			<hr />
			<Counter
				onChange={value => setCustomValue('roomCount', value)}
				value={roomCount}
				title="Rooms"
				subtitle="How many rooms do you have?"
			/>
			<hr />
			<Counter
				onChange={value => setCustomValue('bathroomCount', value)}
				value={bathroomCount}
				title="Bathrooms"
				subtitle="How many bathrooms do you have?"
			/>
			<hr />
		</section>
	);
};

export default Info;
