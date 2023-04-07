import ClientSafeComponent from '@/app/components/ClientSafeComponent';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

interface Props {
	reservations?: SafeReservation[];
	listing: SafeListing & { user: SafeUser };
	curUser?: SafeUser | null;
}

const ListingClient: React.FC<Props> = ({
	listing,
	reservations = [],
	curUser,
}) => {
	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<ClientSafeComponent>
					<div className="flex flex-col gap-6">
						<ListingHead
							title={listing.title}
							imageSrc={listing.imageSrc}
							locationValue={listing.locationValue}
							id={listing.id}
							user={curUser}
						/>
						<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
							<ListingInfo
								user={listing.user}
								category={listing.category}
								description={listing.description}
								roomCount={listing.roomCount}
								guestCount={listing.guestCount}
								bathroomCount={listing.bathroomCount}
								locationValue={listing.locationValue}
							/>
							<div className="order-first mb-10 md:order-last md:col-span-3">
								<ListingReservation
									listing={listing}
									reservations={reservations}
									curUser={curUser || null}
								/>
							</div>
						</div>
					</div>
				</ClientSafeComponent>
			</div>
		</Container>
	);
};

export default ListingClient;
