import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/RegisterModal';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
import ClientSafeComponent from './components/ClientSafeComponent';

export const metadata = {
	title: 'BeMyGuest',
	description: 'BeMyGuest Airbnb clone',
};

const font = Nunito({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ClientSafeComponent>
					<ToasterProvider />
					<RegisterModal />
					<Navbar />
				</ClientSafeComponent>
				{children}
			</body>
		</html>
	);
}
