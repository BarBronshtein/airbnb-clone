'use client';

import { Range, RangeKeyDict } from 'react-date-range';
import Heading from '../../Heading';
import Calendar from '../../Inputs/Calendar';
import Steps from '../../STEPS/Steps';

interface Props {
	onChange: (val: RangeKeyDict) => void;
	dateRange: Range;
}

const Date: React.FC<Props> = ({ onChange, dateRange }) => {
	return (
		<section className="flex flex-col gap-8">
			<Heading
				title="When do you plain to go?"
				subtitle="Make sure everyone is free!"
			/>
			<Calendar value={dateRange} onChange={onChange} />
			<hr />
			<Steps values={['Location', 'Date', 'Info']} curStepIdx={1} />
		</section>
	);
};

export default Date;
