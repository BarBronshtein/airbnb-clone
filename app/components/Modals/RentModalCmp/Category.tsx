'use client';

import Heading from '../../Heading';
import CategoryInput from '../../Inputs/CategoryInput';
import Steps from '../../STEPS/Steps';
import { categoires } from '../../Navbar/Categories';

interface Props {
	setCustomValue: (id: string, val: string) => void;
	category: string;
}

const Category: React.FC<Props> = ({ setCustomValue, category }) => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categoires.map(item => (
					<div className="col-span-1" key={item.title}>
						<CategoryInput
							onClick={category => setCustomValue('category', category)}
							selected={item.title === category}
							title={item.title}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
			<Steps
				values={['Category', 'Location', 'Info', 'Images', 'Description', 'Price']}
				curStepIdx={0}
			/>
		</section>
	);
};

export default Category;
