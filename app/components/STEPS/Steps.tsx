'use client';

interface Props {
	values: string[];
	curStepIdx: number;
}

const Steps: React.FC<Props> = ({ values, curStepIdx = 0 }) => {
	return (
		<ul className="steps">
			{values.map((val, idx) => (
				<li
					key={val}
					className={idx <= curStepIdx ? 'step step-secondary' : 'step'}
				>
					{val}
				</li>
			))}
		</ul>
	);
};

export default Steps;
