import React from 'react'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	})

	const { name, email, password, password2 } = formData;

	const onChange = () => {}

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
				<form className="mx-auto">
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