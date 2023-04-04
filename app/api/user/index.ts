import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/db/prismadb';

export const getSession = async () => await getServerSession(authOptions);

export const getCurUser = async () => {
	try {
		const session = await getSession();
		if (!session?.user?.email) return null;
		const curUser = await prisma.user.findUnique({
			where: { email: session.user.email },
		});
		if (!curUser) return null;
		return {
			...curUser,
			createdAt: curUser.createdAt.toISOString(),
			updatedAt: curUser.updatedAt.toISOString(),
			emailVerified: curUser.emailVerified?.toISOString() || null,
		};
	} catch (err) {
		return null;
	}
};
