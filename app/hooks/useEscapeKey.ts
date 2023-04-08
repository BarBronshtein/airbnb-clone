import { useEffect } from 'react';

export const useOnEscapeKey = (handler: () => void) => {
	useEffect(() => {
		const listener = (ev: KeyboardEvent) => {
			if (ev.key === 'Escape') handler();
		};
		document.addEventListener('keyup', listener);

		return () => {
			document.removeEventListener('keyup', listener);
		};
	}, [handler]);
};
