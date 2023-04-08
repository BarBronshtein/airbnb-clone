import EmptyState from '../components/Empty';
import ClientSafeComponent from '../components/ClientSafeComponent';

import { useUserStore } from '../store/useUserStore';
import { assingCurUser } from '../page';
import PropertiesClient from './PropertiesClient';
import { getListings } from '../api/listings';

const PropertiesPage = async () => {
	const { user } = useUserStore;
	const curUser = user || (await assingCurUser());
	if (!curUser) {
		return (
			<ClientSafeComponent>
				<EmptyState title="Unauthorized" subtitle="Please login" />
			</ClientSafeComponent>
		);
	}

	const listings = await getListings({ userId: curUser.id });

	if (!listings.length) {
		return (
			<ClientSafeComponent>
				<EmptyState
					title="No properties found"
					subtitle="Looks like you have no properties"
				/>
			</ClientSafeComponent>
		);
	}

	return (
		<ClientSafeComponent>
			<PropertiesClient listings={listings} curUser={curUser} />
		</ClientSafeComponent>
	);
};

export default PropertiesPage;
