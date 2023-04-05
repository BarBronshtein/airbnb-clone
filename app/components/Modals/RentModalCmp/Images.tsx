'use client';

import Heading from '../../Heading';
import ImageUpload from '../../Inputs/ImageUpload';
import Steps from '../../STEPS/Steps';

interface Props {
	imageSrc: string[];
	setCustomValue: (id: string, value: string[]) => void;
}

const Images: React.FC<Props> = ({ imageSrc, setCustomValue }) => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="Add photos of your place"
				subtitle="Show guests what your place looks like!"
			/>
			<ImageUpload
				values={imageSrc}
				onChange={value => setCustomValue('imageSrc', value)}
			/>
			<hr />
			<Steps
				values={['Category', 'Location', 'Info', 'Images', 'Description', 'Price']}
				curStepIdx={3}
			/>
		</section>
	);
};

export default Images;
