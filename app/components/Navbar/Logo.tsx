'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
	const router = useRouter();
	return (
		<div
			className="flex items-center justify-center cursor-pointer "
			onClick={() => router.push('/')}
		>
			<Image
				priority
				alt="Logo"
				className="hidden md:block h-[50px] object-contain"
				height="100"
				width="100"
				src="/images/logo.png"
			/>
			<h1 className="text-rose-500 sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-bold md:mr-8">
				BeMyGuest
			</h1>
		</div>
	);
};

export default Logo;
