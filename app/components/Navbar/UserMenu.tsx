'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';

const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen(prev => !prev);
	}, []);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={() => {}}
					className="hidden md:block px-4 py-3 rounded-full text-sm font-semibold hover:bg-neutral-100 transition cursor-pointer"
				>
					BeMyGuest your home
				</div>
				<div
					onClick={toggleOpen}
					className="flex flex-row items-center rounded-full p-4 md:py-1 md:px-2 border-[1px] border-neutral-100  cursor-pointer transition hover:shadow-md"
				>
					<AiOutlineMenu />
					<div className="hidden md:block pl-2">
						<Avatar />
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white text-sm overflow-hidden top-12 right-0">
					<div className="flex flex-col cursor-pointer">
						<>
							<MenuItem onClick={() => {}} text="login" />
							<MenuItem onClick={() => {}} text="Sign up" />
						</>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
