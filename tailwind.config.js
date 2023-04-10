/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			screens: { xs: { max: '420px' }, tall: { raw: '(min-height: 800px)' } },
		},
	},
	plugins: [require('daisyui')],
	daisyui: { themes: ['light'] },
};
