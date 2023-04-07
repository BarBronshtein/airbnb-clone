'use client';

import { useRouter } from 'next/navigation';
import { SafeReservation, SafeUser } from '../types';
import { useState } from 'react';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { httpService } from '../services/http.service';
import { toast } from 'react-hot-toast';
import ListningCard from '../components/listings/ListningCard';

interface Props {
	reservations: SafeReservation[];
	user: SafeUser;
}

const ReservationClient: React.FC<Props> = ({ reservations, user }) => {
	const router = useRouter();
	const [removingId, setRemovingId] = useState('');

	const onCacnel = (id: string) => {
		setRemovingId(id);
		httpService
			.delete(`/api/reservations/${id}`)
			.then(() => {
				toast.success('Reservation canceled');
				router.refresh();
			})
			.catch(() => toast.error('Something went wrong.'))
			.finally(() => setRemovingId(''));
	};

	return (
		<Container>
			<Heading title="Reservations" subtitle="Bookings on your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map(reservation => (
					<ListningCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCacnel}
						actionLabel="Cancel guest reservation"
						user={user}
						disabled={removingId === reservation.id}
					/>
				))}
			</div>
		</Container>
	);
};

export default ReservationClient;
