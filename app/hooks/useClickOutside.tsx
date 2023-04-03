import { useEffect } from 'react';

export const useOnClickOutside = (
	ref: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
	handler: () => void
) => {
	useEffect(() => {
		const listener = (ev: MouseEvent | TouchEvent) => {
			// Do nothing if clicking ref's element or descendent elements
			if (Array.isArray(ref)) {
				let contains = false;
				for (let i = 0; i < ref.length; i++) {
					if (!ref[i].current || ref[i].current?.contains(ev.target as Node))
						contains = true;
				}
				if (contains) return;
			} else if (!ref.current || ref.current.contains(ev.target as Node)) {
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
