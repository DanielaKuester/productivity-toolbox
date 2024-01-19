import React from 'react'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '@/src/features/auth/authSlice'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner'

/* The register, login and dashboard pages are made with the help of the following MERN stack tutorial by Traversy Media:
 * https://www.youtube.com/watch?v=mvfsC66xqj0&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=4
 */

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	})

	const { name, email, password, password2 } = formData;

	const router = useRouter();

	const dispatch = useDispatch();

	const {user, isLoading, isError, isSuccess, message} = useSelector(
		(state) => state.auth
	)

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess /*|| user*/) {
			router.push('/');
		}

		// Here, the reset function from the authSlice is dispatched to reset the values of isError, isSuccess and message
		dispatch(reset());

	}, [user, isError, isSuccess, message, dispatch, router])

	/* The form data is set here to an object. A function with the previous state as an argument is passed to the setFormData function.
	 * The part that is right from the arrow (with the curly braces) is wrapped into paranthesis to get a whole object.
	 * This object contains the name, e-mail-adress and password. Different elements or objects for each category are unnecessary.
	 */
	const onChange = (e) => {
		// The spread operator is used to spread across the previous state to get all the fields. The name and value of the fields serve as the name and value properties of the new object.
		setFormData((previousState) => ({
			...previousState,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (password != password2) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				name,
				/*email,*/
				password
			}

			dispatch(register(userData))
		}
	}

	if(isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className="heading">
				<Header/>
				<h1 className="flex items-center justify-center items-baseline text-3xl p-8 font-bold text-black text-center">
					<FaUser />
					<span className="pl-4">Register</span>
				</h1>
				<p className="text-center text-2xl mb-6 font-bold text-gray-500">Please create an account.</p>
			</section>
			<section className="form flex">
				<form onSubmit={onSubmit} className="mx-auto">
					<div className="form-group">
						<input
							type="text"
							className="form-control p-2 mt-4 w-96 border-solid border-4 border-gray-400"
							id="name"
							name="name"
							value={name}
							placeholder="Enter your name"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							className="form-control p-2 mt-4 w-96 border-solid border-4 border-gray-400"
							id="email"
							name="email"
							value={email}
							placeholder="Enter your e-mail address"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control p-2 mt-4 w-96 border-solid border-4 border-gray-400"
							id="password"
							name="password"
							value={password}
							placeholder="Enter password"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control p-2 mt-4 w-96 border-solid border-4 border-gray-400"
							id="password2"
							name="password2"
							value={password2}
							placeholder="Confirm password"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<button type="submit" className="p-2 mt-4 w-96 bg-gray-800 text-white text-lg rounded">Submit</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default Register