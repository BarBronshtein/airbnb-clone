'use client';

import useHasMounted from '../hooks/useHasMounted';

interface Props {
	children: React.ReactNode;
}

const ClientSafeComponent: React.FC<Props> = ({ children }) => {
	const { hasMounted } = useHasMounted();
	if (!hasMounted) return null;
	return <>{children}</>;
};

export default ClientSafeComponent;
