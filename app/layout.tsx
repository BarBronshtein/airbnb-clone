import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/RegisterModal';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
import ClientSafeComponent from './components/ClientSafeComponent';
import LoginModal from './components/Modals/LoginModal';
import { getCurUser } from './api/user';

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
	const curUser = await getCurUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientSafeComponent>
					<ToasterProvider />
					<LoginModal />
					<RegisterModal />
					<Navbar user={curUser} />
				</ClientSafeComponent>
				{children}
			</body>
		</html>
	);
}
