'use client';

import axios from 'axios';

import { useCallback, useState } from 'react';
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRegister } from '@/app/store/useRegister';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { useLogin } from '@/app/store/useLogin';

const RegisterModal = () => {
	const registerModal = useRegister();
	const loginModal = useLogin();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: { name: '', email: '', password: '' },
	});

	const onSubmit: SubmitHandler<FieldValues> = async data => {
		setIsLoading(true);
		try {
			await axios.post('/api/register', data);
			registerModal.onClose();
		} catch (err) {
			toast.error('Something went wrong, please try again later...');
		} finally {
			setIsLoading(false);
		}
	};

	const body = (
		<main className="flex flex-col gap-4">
			<Heading title="Wlecome to BeMyGuest" subtitle="Create an account" />
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
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
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
					<p>Already have an account?</p>

					<p
						onClick={() => {
							registerModal.onClose();
							loginModal.onOpen();
						}}
						className="text-neutral-800 cursor-pointer hover:underline"
					>
						Log in?
					</p>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onSubmit={handleSubmit(onSubmit)}
			onClose={registerModal.onClose}
			body={body}
			footer={footer}
		/>
	);
};

export default RegisterModal;
