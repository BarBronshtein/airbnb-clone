'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Props {
	value: Range;
	onChange: (val: RangeKeyDict) => void;
	disabledDates?: Date[];
}

const Calendar: React.FC<Props> = ({ onChange, value, disabledDates }) => {
	return (
		<DateRange
			onChange={onChange}
			ranges={[value]}
			date={new Date()}
			direction="vertical"
			showDateDisplay={false}
			minDate={new Date()}
			disabledDates={disabledDates}
			rangeColors={['#262626']}
		/>
	);
};

export default Calendar;
