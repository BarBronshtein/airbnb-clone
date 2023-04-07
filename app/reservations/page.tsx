import getReservations from '../api/reservations';
import ClientSafeComponent from '../components/ClientSafeComponent';
import EmptyState from '../components/Empty';
import { assingCurUser } from '../page';
import { useUserStore } from '../store/useUserStore';
import ReservationClient from './ReservationClient';

const ReservationPage = async () => {
	const { user } = useUserStore;
	const curUser = user || (await assingCurUser());

	if (!curUser) {
		return (
			<ClientSafeComponent>
				<EmptyState title="Unathorized" subtitle="Please login" />{' '}
			</ClientSafeComponent>
		);
	}

	const reservations = await getReservations({ authorId: curUser.id });

	if (!reservations.length) {
		return (
			<ClientSafeComponent>
				<EmptyState
					title="No reservations found"
					subtitle="Looks like you have not reservations on your properties"
				/>{' '}
			</ClientSafeComponent>
		);
	}

	return (
		<ClientSafeComponent>
			<ReservationClient reservations={reservations} user={curUser} />
		</ClientSafeComponent>
	);
};

export default ReservationPage;
