import { useEffect } from 'react';

export const useOnClickOutside = (
	ref: React.RefObject<HTMLElement>,
	handler: () => void
) => {
	useEffect(() => {
		const listener = (ev: MouseEvent | TouchEvent) => {
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(ev.target as Node)) {
				return;
			}
			handler();
		};
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
};
