'use client';

import Heading from '../../Heading';
import ImageUpload from '../../Inputs/ImageUpload';

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
		</section>
	);
};

export default Images;
