import { getListings } from './api/listings';
import { getCurUser } from './api/user';
import ClientSafeComponent from './components/ClientSafeComponent';
import Container from './components/Container';
import EmptyState from './components/Empty';
import ListningCard from './components/listings/ListningCard';
import { useUserStore } from './store/useUserStore';

export async function assingCurUser() {
	const { setUser } = useUserStore;
	const user = await getCurUser();
	setUser(user);
	return user;
}

export default async function Home() {
	const listings = await getListings();
	const { user, setUser } = useUserStore;
	const curUser = user || (await assingCurUser());

	if (!listings.length) {
		return (
			<ClientSafeComponent>
				<EmptyState showReset />
			</ClientSafeComponent>
		);
	}

	return (
		<ClientSafeComponent>
			<Container>
				<div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl::grid-cols-5 2xl:grid-cols-6 gap-8">
					{listings.map(listing => (
						<ListningCard key={listing.id} data={listing} user={curUser} />
					))}
				</div>
			</Container>
		</ClientSafeComponent>
	);
}
