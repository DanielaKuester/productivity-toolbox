import React from 'react'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	})

	return (
		<div>
			<Header/>
			<h1 className="text-3xl p-8 font-bold text-black text-center">
				Register
			</h1>
		</div>
	)
}

export default Register