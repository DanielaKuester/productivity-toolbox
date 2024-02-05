import React from 'react';
import Header from '@/components/Header';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TodoForm from '@/components/TodoForm';

function Dashboard() {
	const {user} = useSelector((state) => state.auth)

	return (
		<>
			<section>
				<Header/>
				<h1 className="text-3xl p-8 font-bold text-black text-center">
					{/* If the user is logged in, show the user's name. */}
					Welcome, {user && user.name}!
				</h1>
				<p className="text-2xl p-8 pt-0 font-bold text-gray-500 text-center">
					To Do List Dashboard
				</p>
			</section>

			<div className="text-black text-center">
				<TodoForm />
			</div>
		</>
	)
}

export default Dashboard