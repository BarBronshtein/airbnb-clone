'use client';

import { useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import { useRegister } from '@/app/store/useRegister';
import { useOnClickOutside } from '@/app/hooks/useClickOutside';
import { useLogin } from '@/app/store/useLogin';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRent } from '@/app/store/useRent';
import { useRouter } from 'next/navigation';
import { useOnEscapeKey } from '@/app/hooks/useEscapeKey';

interface Props {
	user: SafeUser | null;
}

const UserMenu: React.FC<Props> = ({ user }) => {
	const router = useRouter();
	const avatarRef = useRef<HTMLDivElement>(null);
	const itemMenuRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);

	const registerModal = useRegister();
	const loginModal = useLogin();
	const rentModal = useRent();

	const toggleOpen = useCallback(() => {
		setIsOpen(prev => !prev);
	}, []);

	const closeUserMenu = useCallback(() => {
		setIsOpen(false);
	}, []);

	const onRent = useCallback(() => {
		if (!user) return loginModal.onOpen();

		// TODO: Open rent modal
		rentModal.onOpen();
	}, [user, loginModal, rentModal]);

	useOnClickOutside([avatarRef, itemMenuRef], closeUserMenu);
	useOnEscapeKey(closeUserMenu);
	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRent}
					className="hidden md:block px-4 py-3 md:px-2 lg:px-3 rounded-full text-sm font-semibold hover:bg-neutral-100 transition cursor-pointer"
				>
					BeMyGuest your home
				</div>
				<div
					ref={avatarRef}
					onClick={toggleOpen}
					className="flex flex-row items-center rounded-full p-4 md:py-1 md:px-2 border-[1px] border-neutral-100  cursor-pointer transition hover:shadow-md xs:p-2"
				>
					<AiOutlineMenu />
					<div className="hidden md:block pl-2">
						<Avatar src={user?.image} />
					</div>
				</div>
			</div>

			{isOpen && (
				<div
					ref={itemMenuRef}
					className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white text-sm overflow-hidden top-12 right-0"
				>
					<div className="flex flex-col cursor-pointer">
						{user ? (
							<>
								<MenuItem
									onClick={() => {
										router.push('/trips');
										closeUserMenu();
									}}
									text="My trips"
								/>
								<MenuItem
									onClick={() => {
										router.push('/favorites');
										closeUserMenu();
									}}
									text="My favorites"
								/>
								<MenuItem
									onClick={() => {
										router.push('/reservations');
										closeUserMenu();
									}}
									text="My reservations"
								/>
								<MenuItem
									onClick={() => {
										router.push('/properties');
										closeUserMenu();
									}}
									text="My properties"
								/>
								<MenuItem
									onClick={() => {
										rentModal.onOpen();
										closeUserMenu();
									}}
									text="BeMyGuest my home"
								/>
								<hr />
								<MenuItem onClick={() => signOut()} text="Logout" />
							</>
						) : (
							<>
								<MenuItem
									onClick={() => {
										loginModal.onOpen();
										closeUserMenu();
									}}
									text="Login"
								/>
								<MenuItem
									onClick={() => {
										registerModal.onOpen();
										closeUserMenu();
									}}
									text="Sign up"
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
