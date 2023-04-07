'use client';

import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeReservation, SafeUser } from '../types';
import { useState } from 'react';
import { httpService } from '../services/http.service';
import { toast } from 'react-hot-toast';
import ListningCard from '../components/listings/ListningCard';

interface Props {
	reservations: SafeReservation[];
	curUser: SafeUser;
}

const TripsClient: React.FC<Props> = ({ curUser, reservations }) => {
	const router = useRouter();
	const [removingId, setRemovingId] = useState('');

	const onCancel = (id: string) => {
		setRemovingId(id);
		httpService
			.delete(`/api/reservation/${id}`)
			.then(() => toast.success('Reservation canceled'))
			.catch(err => toast.error(err?.response?.data?.error))
			.finally(() => setRemovingId(''));
	};

	return (
		<div>
			<Container>
				<Heading
					title="Trips"
					subtitle="Where you've been and where you're going"
				/>
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{reservations.map(reservation => (
						<ListningCard
							key={reservation.id}
							data={reservation.listing}
							reservation={reservation}
							actionId={reservation.id}
							disabled={removingId === reservation.id}
							user={curUser}
							actionLabel="Cancel reservation"
						/>
					))}
				</div>
			</Container>
		</div>
	);
};

export default TripsClient;
