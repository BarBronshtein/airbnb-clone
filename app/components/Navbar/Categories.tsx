'use client';

import Container from '../Container';
import { categories } from '@/app/services/icon.service';
import CategoryBox from './CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
	const params = useSearchParams();
	const category = params?.get('category');
	const pathname = usePathname();

	const isMainPage = pathname === '/';
	if (!isMainPage) return null;
	return (
		<Container>
			<div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
				{categories.map(item => (
					<CategoryBox
						key={item.title}
						{...item}
						selected={category === item.title}
					></CategoryBox>
				))}
			</div>
		</Container>
	);
};

export default Categories;
