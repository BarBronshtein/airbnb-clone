import { useCountries } from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import Heading from '../Heading';

interface Props {
	id: string;
	title: string;
	imageSrc: string[];
	locationValue: string;
	user: SafeUser | null;
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
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative"></div>
		</>
	);
};

export default ListingHead;
