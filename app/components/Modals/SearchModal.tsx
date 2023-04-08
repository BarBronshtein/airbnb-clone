import { useSearch } from '@/app/store/useSearch';
import Modal from './Modal';

const SearchModal = () => {
	const searchModal = useSearch();

	return (
		<Modal
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSubmit={searchModal.onClose}
			title="Filters"
			actionLabel="Search"
		/>
	);
};

export default SearchModal;
