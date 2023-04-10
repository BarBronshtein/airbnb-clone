'use client';

import { SafeUser } from '@/app/types';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Categoires from './Categories';

interface Props {
	user: SafeUser | null;
}

const Navbar: React.FC<Props> = ({ user }) => {
	return (
		<nav className="fixed w-full bg-white z-10 shadow-sm">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex flex-row items-center xs:justify-center justify-between gap-3 md:gap-0">
						<Logo />
						<Search />
						<UserMenu user={user} />
					</div>
				</Container>
			</div>
			<Categoires />
		</nav>
	);
};

export default Navbar;
