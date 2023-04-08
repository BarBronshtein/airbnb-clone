'use client';

import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeListing, SafeUser } from '../types';
import { useState } from 'react';
import { httpService } from '../services/http.service';
import { toast } from 'react-hot-toast';
import ListningCard from '../components/listings/ListningCard';

interface Props {
	listings: SafeListing[];
	curUser: SafeUser;
}

const PropertiesClient: React.FC<Props> = ({ curUser, listings }) => {
	const router = useRouter();
	const [removingId, setRemovingId] = useState('');

	const onCancel = (id: string) => {
		setRemovingId(id);
		httpService
			.delete(`/api/listings/${id}`)
			.then(() => {
				toast.success('Listing deleted');
				router.refresh();
			})
			.catch(err => toast.error(err?.response?.data?.error))
			.finally(() => setRemovingId(''));
	};

	return (
		<div>
			<Container>
				<Heading title="Properties" subtitle="List of your properties" />
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
					{listings.map(listing => (
						<ListningCard
							key={listing.id}
							data={listing}
							actionId={listing.id}
							onAction={onCancel}
							disabled={removingId === listing.id}
							user={curUser}
							actionLabel="Delete Property"
						/>
					))}
				</div>
			</Container>
		</div>
	);
};

export default PropertiesClient;
