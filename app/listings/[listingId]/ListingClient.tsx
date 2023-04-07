import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import { titledCategories } from '@/app/services/icon.service';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';

interface Props {
	reservations?: Reservation[];
	listing: SafeListing & { user: SafeUser };
	user?: SafeUser | null;
}

const ListingClient: React.FC<Props> = ({ listing, reservations, user }) => {
	const category = titledCategories.find(
		category => category === listing.category
	);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						user={user}
					/>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
