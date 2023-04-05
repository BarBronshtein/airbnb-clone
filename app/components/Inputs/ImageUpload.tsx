'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
	var cloudinary: any;
}

interface Props {
	onChange: (val: string[]) => void;
	values: string[];
}

const ImageUpload: React.FC<Props> = ({ onChange, values }) => {
	const handleUpload = useCallback(
		(res: any) => {
			onChange([...values, res.info.secure_url]);
		},
		[onChange, values]
	);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="matiuigt"
			options={{
				clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif'],
				maxFiles: 5,
				multiple: true,
				sources: ['local', 'url', 'dropbox', 'google_drive'],
			}}
		>
			{({ open }) => {
				return (
					<button
						type="button"
						onClick={() => open?.()}
						className="relative flex flex-col justify-center items-center gap-4 text-neutral-600 hover:opacity-70 cursor-pointer border-dashed border-2 p-20 border-neutral-300"
					>
						<TbPhotoPlus size={50} />
						<h4 className="font-semibold text-lg">Click to upload</h4>
						{/* Image gallery */}
						{values.length ? (
							<div className="absolute inset-0 h-full w-full">
								{values.map(value => (
									<Image
										key={value}
										alt="Upload"
										fill
										className="w-full h-full"
										style={{ objectFit: 'cover' }}
										src={value}
									/>
								))}
							</div>
						) : null}
					</button>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
