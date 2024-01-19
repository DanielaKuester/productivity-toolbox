import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '@/src/features/auth/authSlice'
import { useRouter } from 'next/router'


function Header() {
	const router = useRouter();
	const dispatch = useDispatch();
	const {user} = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		router.push('/');
	}

	return (
		<header className="header flex justify-between shadow-gray-600 shadow-md">
			<div className="logo flex items-center p-2 ml-2">
				<Link href="/">Landing Page</Link>
			</div>
			<ul className="flex">
				{user ? (
					<>
						<li>
							<Link  className="flex items-center p-2" href="/dashboard">
								<p className="pl-2">Dashboard</p>  
							</Link>
						</li>
						<li>
							<button className="btn flex items-center p-2" onClick={onLogout}>
								<FaSignOutAlt /><span className="pl-1 pr-2">Logout</span>
							</button>
						</li>
					</>
					) : (
					<>
						<li>
							<Link className="flex items-center p-2" href="/login">
								<FaSignInAlt/>
								<p className="pl-2">Login</p>    
							</Link>
						</li>
						<li>
							<Link  className="flex items-center mr-2 p-2" href="/register">
								<FaUser />
								<p className="pl-2">Register</p>  
							</Link>
						</li>
					</>)
				}
			</ul>
		</header>
	)
}

export default Header