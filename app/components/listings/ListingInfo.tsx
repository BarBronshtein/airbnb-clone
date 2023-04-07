'use client';

import { useCountries } from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import { categories } from '@/app/services/icon.service';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface Props {
	user: SafeUser;
	category: string;
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
	const { getByValue } = useCountries();

	const coordinates = getByValue(locationValue)?.latlng;
	const fullCategory = categories.find(item => item.title === category)!;
	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<div className="text-xl flex font-semibold flex-row items-center gap-2">
					<h3>Hosted by {user.name}</h3>
					<Avatar src={user.image} />
				</div>
				<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
					<span>{guestCount} guests</span>
					<span>{roomCount} rooms</span>
					<span>{bathroomCount} bathrooms</span>
				</div>
			</div>
			<hr />
			<ListingCategory
				icon={fullCategory.icon}
				title={fullCategory.title}
				subtitle={fullCategory.subtitle}
			/>
			<hr />
			<p className="text-lg font-light text-neutral-500">{description}</p>
			<hr />
			<Map center={coordinates} />
		</div>
	);
};

export default ListingInfo;
