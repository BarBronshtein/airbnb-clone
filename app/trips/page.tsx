import EmptyState from '../components/Empty';
import ClientSafeComponent from '../components/ClientSafeComponent';

import getReservations from '../api/reservations';
import { useUserStore } from '../store/useUserStore';
import { assingCurUser } from '../page';
import TripsClient from './TripsClient';

const TripsPage = async () => {
	const { user } = useUserStore;
	const curUser = user || (await assingCurUser());
	if (!curUser) {
		return (
			<ClientSafeComponent>
				<EmptyState title="Unauthorized" subtitle="Please login" />
			</ClientSafeComponent>
		);
	}

	const reservations = await getReservations({ userId: curUser.id });

	if (!reservations.length) {
		return (
			<ClientSafeComponent>
				<EmptyState
					title="No trips found"
					subtitle="Looks like you haven't reserved any trips"
				/>
			</ClientSafeComponent>
		);
	}

	return (
		<ClientSafeComponent>
			<TripsClient reservations={reservations} curUser={curUser} />
		</ClientSafeComponent>
	);
};

export default TripsPage;
