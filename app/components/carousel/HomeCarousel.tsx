'use client';

import Image from 'next/image';
import { useRef } from 'react';

interface Props {
	imageSrc: string[];
	id: string;
}

const HomeCarousel: React.FC<Props> = ({ imageSrc, id }) => {
	const status = useRef(1);
	const showStatusRef = useRef<HTMLParagraphElement>(null);

	const onNext = () => {
		status.current = status.current === imageSrc.length ? 1 : status.current + 1;
		showStatusRef.current!.textContent = `${status.current} / ${imageSrc.length}`;
	};
	const onPrev = () => {
		status.current = status.current === 1 ? imageSrc.length : status.current - 1;
		showStatusRef.current!.textContent = `${status.current} / ${imageSrc.length}`;
	};

	return (
		<>
			{imageSrc.map((src, i) => (
				<div
					key={src}
					id={`slide-${id}-${i}`}
					className="carousel-item relative w-full"
				>
					<Image alt="Listing" src={src} className="w-full" fill sizes="300px" />
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a
							onClick={onPrev}
							href={`#slide-${id}-${i === 0 ? imageSrc.length - 1 : i - 1}`}
							className="btn hover:bg-rose-500 btn-circle bg-transparent"
						>
							❮
						</a>
						<a
							onClick={onNext}
							href={`#slide-${id}-${i === imageSrc.length - 1 ? 0 : i + 1}`}
							className="btn btn-circle hover:bg-rose-500 p-2 bg-transparent"
						>
							❯
						</a>
					</div>
				</div>
			))}
			<p
				className="absolute text-white font-light right-3 top-[10px]"
				ref={showStatusRef}
			>
				{status.current} / {imageSrc.length}
			</p>
		</>
	);
};

export default HomeCarousel;
