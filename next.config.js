/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: [
			'avatars.githubusercontent.com',
			'lh3.googleusercontent.com',
			'res.cloudinary.com',
			'static.xx.fbcdn.net',
		],
	},
};

module.exports = nextConfig;
