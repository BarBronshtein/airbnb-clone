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
import Head from 'next/head';

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
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</head>
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
