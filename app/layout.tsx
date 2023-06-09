import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/RegisterModal';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
import ClientSafeComponent from './components/ClientSafeComponent';
import LoginModal from './components/Modals/LoginModal';
import RentModal from './components/Modals/RentModal';
import { useUserStore } from './store/useUserStore';
import { assingCurUser } from './page';
import SearchModal from './components/Modals/SearchModal';

export const metadata = {
	title: 'BeMyGuest',
	description: 'BeMyGuest Airbnb clone',
};

const font = Nunito({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useUserStore;
	const curUser = user || (await assingCurUser());

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientSafeComponent>
					<ToasterProvider />
					<LoginModal />
					<SearchModal />
					<RentModal />
					<RegisterModal />
					<Navbar user={curUser} />
				</ClientSafeComponent>
				<main className="pb-20 pt-28">{children}</main>
			</body>
		</html>
	);
}
