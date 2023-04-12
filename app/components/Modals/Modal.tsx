'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';
import { useOnClickOutside } from '@/app/hooks/useClickOutside';
import { useOnEscapeKey } from '@/app/hooks/useEscapeKey';

interface Props {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	disabled?: boolean;
	actionLabel: string;
	secondaryLabel?: string;
	secondaryAction?: () => void;
}

const Modal: React.FC<Props> = ({
	isOpen,
	actionLabel,
	onClose,
	onSubmit,
	body,
	disabled,
	footer,
	secondaryAction,
	secondaryLabel,
	title,
}) => {
	const [showModal, setShowModal] = useState(isOpen);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) return;
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	useOnClickOutside(modalRef, handleClose);
	useOnEscapeKey(handleClose);
	const handleSubmit = useCallback(() => {
		if (disabled) return;
		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return;
		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) return null;

	return (
		<div className="fixed flex overflow-x-hidden overflow-y-auto tall:items-center justify-center inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
			<main className="realtive w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
				<div
					className={`translate duration-300 h-full ${
						showModal ? 'translate-y-0 opcaity-100' : 'translate-y-full opcaity-0'
					}
					`}
				>
					<div
						ref={modalRef}
						className="relative flex flex-col bg-white outline-none w-full h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg translate focus:outline-none"
					>
						{/* Header */}
						<header className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
							<button
								className="absolute p-1 border-0 hover:opacity-70 transition left-9"
								onClick={handleClose}
							>
								<IoMdClose size={18} />
							</button>
							<div className="text-lg font-semibold">{title}</div>
						</header>
						{/* Body */}
						<section className="relative p-6 flex-auto bg-white">{body}</section>
						{/*footer*/}
						<footer className="flex flex-col gap-2 p-6 bg-white rounded-b">
							<div className="flex flex-row items-center gap-4 w-full">
								{secondaryAction && secondaryLabel && (
									<Button
										disabled={disabled}
										label={secondaryLabel}
										onClick={handleSecondaryAction}
										outline
									/>
								)}
								<Button
									disabled={disabled}
									label={actionLabel}
									onClick={handleSubmit}
								/>
							</div>
							{footer}
						</footer>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Modal;
