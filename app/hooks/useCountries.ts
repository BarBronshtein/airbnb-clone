import countries from 'world-countries';

const formattedCountries = countries.map(country => ({
	value: country.cca2,
	name: country.name.common,
	flag: country.flag,
	latlng: country.latlng,
	region: country.region,
}));

export const useCountries = () => {
	const getAll = () => formattedCountries;
	const getByValue = (val: string) =>
		formattedCountries.find(country => country.value === val);

	return {
		getAll,
		getByValue,
	};
};
