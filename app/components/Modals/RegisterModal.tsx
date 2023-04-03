'use client';

import axios from 'axios';

import { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRegister } from '@/app/store/useRegister';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';

const RegisterModal = () => {
	const registerModal = useRegister();
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
			console.log(err);
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

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onSubmit={handleSubmit(onSubmit)}
			onClose={registerModal.onClose}
			body={body}
		/>
	);
};

export default RegisterModal;
