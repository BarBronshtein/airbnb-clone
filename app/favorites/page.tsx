import ClientSafeComponent from '../components/ClientSafeComponent';
import EmptyState from '../components/Empty';
import { assingCurUser } from '../page';
import { useUserStore } from '../store/useUserStore';
import getFavoriteListings from '../api/favorites';
import FavoritesClient from './FavoritesClient';

const ListingPage = async () => {
	const listings = await getFavoriteListings();
	const { user } = useUserStore;
	const curUser = user || (await assingCurUser());

	if (!listings.length) {
		return (
			<ClientSafeComponent>
				<EmptyState
					title="No favroties found"
					subtitle="Looks like you have no favorite listings."
				/>
			</ClientSafeComponent>
		);
	}
	return (
		<ClientSafeComponent>
			<FavoritesClient listings={listings} curUser={curUser} />
		</ClientSafeComponent>
	);
};

export default ListingPage;
