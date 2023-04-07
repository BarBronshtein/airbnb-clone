import { useCountries } from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import Heading from '../Heading';
import HeartButton from '../HeartButton';
import ReservationCarousel from '../carousel/ReservationCarousel';

interface Props {
	id: string;
	title: string;
	imageSrc: string[];
	locationValue: string;
	user?: SafeUser | null;
}

const ListingHead: React.FC<Props> = ({
	id,
	imageSrc,
	locationValue,
	title,
	user,
}) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);

	return (
		<>
			<Heading title={title} subtitle={`${location?.region}, ${location?.name}`} />
			<div className="relative">
				<div className="w-full h-[60vh] overflow-hidden rounded-xl flex flex-row">
					<ReservationCarousel imageSrc={imageSrc} id={id} />
					<div className="absolute top-5 right-5">
						<HeartButton listingId={id} user={user} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ListingHead;
