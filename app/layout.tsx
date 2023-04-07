import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/RegisterModal';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
import ClientSafeComponent from './components/ClientSafeComponent';
import LoginModal from './components/Modals/LoginModal';
import { getCurUser } from './api/user';
import RentModal from './components/Modals/RentModal';
import { useUserStore } from './store/useUserStore';
import { assingCurUser } from './page';

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
	const { user, setUser } = useUserStore;
	const curUser = user || (await assingCurUser());

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientSafeComponent>
					<ToasterProvider />
					<LoginModal />
					<RentModal />
					<RegisterModal />
					<Navbar user={curUser} />
				</ClientSafeComponent>
				<main className="pb-20 pt-28">{children}</main>
			</body>
		</html>
	);
}
