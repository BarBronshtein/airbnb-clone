import { getListingById } from '@/app/api/listings';
import ClientSafeComponent from '@/app/components/ClientSafeComponent';
import EmptyState from '@/app/components/Empty';
import { assingCurUser } from '@/app/page';
import { useUserStore } from '@/app/store/useUserStore';
import ListingClient from './ListingClient';
import getReservations from '@/app/api/reservations';

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params);
	const reservations = await getReservations(params);
	const { user, setUser } = useUserStore;
	const curUser = user || (await assingCurUser());

	if (!listing)
		return (
			<ClientSafeComponent>
				<EmptyState />
			</ClientSafeComponent>
		);
	return (
		<ClientSafeComponent>
			<ListingClient
				listing={listing}
				curUser={curUser}
				reservations={reservations}
			/>
		</ClientSafeComponent>
	);
};

export default ListingPage;
