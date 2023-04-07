import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';

interface Props {
	user: SafeUser;
	category: {
		title: string;
		icon: IconType;
		subtitle: string;
	};
	description: string;
	roomCount: number;
	guestCount: number;
	bathroomCount: number;
	locationValue: string;
}

const ListingInfo: React.FC<Props> = ({
	bathroomCount,
	category,
	description,
	guestCount,
	locationValue,
	roomCount,
	user,
}) => {
	return <div></div>;
};

export default ListingInfo;
