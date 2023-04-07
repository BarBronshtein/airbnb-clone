'use client';

import { IconType } from 'react-icons';

interface Props {
	title: string;
	subtitle: string;
	icon: IconType;
}

const ListingCategory: React.FC<Props> = ({ icon: Icon, subtitle, title }) => {
	return (
		<div className="flex felx-col gap-6 ">
			<div className="flex flex-row items-center gap-4">
				<Icon size={40} className="text-neutral-600" />
				<div className="flex flex-col">
					<h3 className="text-lg font-semibold">{title}</h3>
					<p className="text-neutral-500 font-light">{subtitle}</p>
				</div>
			</div>
		</div>
	);
};

export default ListingCategory;
