import { getListingById } from '@/app/api/listings';
import ClientSafeComponent from '@/app/components/ClientSafeComponent';
import EmptyState from '@/app/components/Empty';
import { assingCurUser } from '@/app/page';
import { useUserStore } from '@/app/store/useUserStore';
import ListingClient from './ListingClient';

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params);

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
			<ListingClient listing={listing} user={curUser} />
			{/* {JSON.stringify(listing)} */}
		</ClientSafeComponent>
	);
};

export default ListingPage;
