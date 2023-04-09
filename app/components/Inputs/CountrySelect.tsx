'use client';

import { useCountries } from '@/app/hooks/useCountries';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import Select from 'react-select';

export type CountrySelectValue = {
	flag: string;
	name: string;
	latlng: number[];
	region: string;
	value: string;
};

interface Props {
	value?: CountrySelectValue;
	onChange: (value: CountrySelectValue) => void;
	register?: UseFormRegister<FieldValues>;
	errors?: FieldErrors<FieldValues>;
}

const CountrySelect: React.FC<Props> = ({
	onChange,
	value,
	errors,
	register,
}) => {
	const { getAll } = useCountries();

	return (
		<div>
			<Select
				{...register?.('location', { required: true })}
				placeholder="Anywhere"
				isClearable
				options={getAll()}
				value={value}
				onChange={value => onChange(value as CountrySelectValue)}
				formatOptionLabel={option => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.flag}</div>
						<div>
							{option.name},
							<span className="text-neutral-500 ml-1 border-rose-500">
								{option.region}
							</span>
						</div>
					</div>
				)}
				classNames={{
					control: () => 'p-3 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg',
				}}
				theme={theme => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: errors?.['location'] ? '#f43f5e' : 'black',
						primary25: '#ffe4e6',
					},
				})}
			/>
		</div>
	);
};

export default CountrySelect;
