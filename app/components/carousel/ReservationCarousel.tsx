'use client';

import Image from 'next/image';

interface Props {
	imageSrc: string[];
	id: string;
}

const ReservationCarousel: React.FC<Props> = ({ id, imageSrc }) => {
	return (
		<>
			{imageSrc.map((src, i) => (
				<div
					key={src}
					id={`slide-${id}-${i}`}
					className="carousel-item relative w-full h-full"
				>
					<Image
						alt="Listing"
						src={src}
						className="w-full object-cover relative"
						fill
						sizes="300px"
					/>
					<div className="absolute flex justify-between transform  -translate-y-1/2 left-5 right-5 top-1/2">
						<a
							href={`#slide-${id}-${i === 0 ? imageSrc.length - 1 : i - 1}`}
							className="btn hover:bg-rose-500 btn-circle  bg-transparent border-none"
						>
							❮
						</a>
						<a
							href={`#slide-${id}-${i === imageSrc.length - 1 ? 0 : i + 1}`}
							className="btn btn-circle  hover:bg-rose-500 p-2 bg-transparent border-none"
						>
							❯
						</a>
					</div>
				</div>
			))}
			<div className="absolute flex justify-center w-full py-2 gap-2 bottom-0 ">
				{imageSrc.map((src, i) => (
					<div
						key={`${id}-${i}`}
						className=" opacity-20 hover:opacity-70 transition"
					>
						<a href={`#slide-${id}-${i}`}>
							<Image
								alt="Image"
								src={src}
								width={75}
								height={75}
								priority
								className="w-full object-cover rounded-sm"
							/>
						</a>
					</div>
				))}
			</div>
		</>
	);
};

export default ReservationCarousel;
