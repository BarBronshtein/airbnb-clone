'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '@/app/store/useLogin';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/app/store/useRegister';

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLogin();
	const registerModal = useRegister();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: { email: '', password: '' },
	});

	const onSubmit: SubmitHandler<FieldValues> = async data => {
		setIsLoading(true);
		const res = await signIn('credentials', { ...data, redirect: false });
		setIsLoading(false);
		if (res?.ok) {
			toast.success('Logged in');
			router.refresh();
			loginModal.onClose();
		}
		if (res?.error) toast.error(res.error);
	};

	const body = (
		<main className="flex flex-col gap-4">
			<Heading title="Wlecome back" subtitle="Login to your account!" />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				type="email"
				required
			/>
			<Input
				id="password"
				type="password"
				label="Password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</main>
	);

	const footer = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				onClick={() => signIn('google')}
				outline
				label="Continue with Google"
				Icon={FcGoogle}
			/>
			<Button
				onClick={() => signIn('facebook')}
				outline
				label="Continue with Facebook"
				Icon={AiFillFacebook}
			/>
			<Button
				onClick={() => signIn('github')}
				outline
				label="Continue with Github"
				Icon={AiFillGithub}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row items-center gap-2 justify-center">
					<p>First time using BeMyGuest?</p>

					<p
						onClick={() => {
							loginModal.onClose();
							registerModal.onOpen();
						}}
						className="text-neutral-800 cursor-pointer hover:underline"
					>
						Create an account
					</p>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onSubmit={handleSubmit(onSubmit)}
			onClose={loginModal.onClose}
			body={body}
			footer={footer}
		/>
	);
};

export default LoginModal;
