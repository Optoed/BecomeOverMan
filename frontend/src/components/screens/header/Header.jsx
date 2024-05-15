import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
	const [showDropdown, setShowDropdown] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false) // State to track user login status
	const [username, setUsername] = useState('') // State to store the username
	const navigate = useNavigate() // Hook для перенаправления пользователя

	useEffect(() => {
		// Check if userID exists in localStorage
		const userId = localStorage.getItem('userId')
		if (userId) {
			setIsLoggedIn(true) // User is logged in
			fetchUsername(userId) // Fetch the username when user is logged in
		} else {
			setIsLoggedIn(false) // User is not logged in
		}
	}, [localStorage.getItem('userId')]) // Empty dependency array ensures the effect runs only once on component mount

	// Function to fetch username using GET request
	const fetchUsername = async userId => {
		try {
			const response = await axios.get(`http://localhost:8000/user/${userId}/`)
			setUsername(response.data.username) // Set the username state with the fetched username
		} catch (error) {
			console.error('Error fetching username:', error)
		}
	}

	// Function to handle logout
	const handleLogout = () => {
		localStorage.removeItem('userId') // Remove userID from localStorage
		setIsLoggedIn(false) // Update login state
		navigate('/login') // Redirect to login page using navigate
	}

	return (
		<header className='text-white py-4 px-6 flex justify-between items-center'>
			<div className='logo text-2xl font-bold'>
				<Link to='/'>Become OverMan</Link>
			</div>

			<nav>
				{isLoggedIn ? (
					<div className='relative'>
						<button onClick={() => setShowDropdown(!showDropdown)} className='border-2 rounded-t-lg border-pink-600 hover:border-pink-500 hover:bg-pink-500 px-10 py-1 text-center transition-colors ease-in-out duration-700'>
							<i className='fas fa-user'></i>
							<span>{username}</span>
							<i className='fas fa-caret-down'></i>
						</button>
						{showDropdown && (
							<div className='border-2 rounded-b-lg border-pink-600 hover:border-pink-500 text-center transition-colors ease-in-out duration-700'>
								<ul>
									<li className='hover:bg-pink-500 px-4 py-2 cursor-pointer duration-700'>Profile</li>
									<li
										onClick={handleLogout} // Call handleLogout function on click
										className='hover:bg-pink-500 px-4 py-2 cursor-pointer duration-700'>
										Logout
									</li>
								</ul>
							</div>
						)}
					</div>
				) : (
					<div className='flex gap-4'>
						<Link to='/login' className='border-2 rounded-lg border-pink-600 hover:border-pink-500 hover:bg-pink-500 px-10 py-1 text-center transition-colors ease-in-out duration-700'>
							Login
						</Link>
						<Link to='/register' className='border-2 rounded-lg border-pink-600 hover:border-pink-500 hover:bg-pink-500 px-10 py-1 text-center transition-colors ease-in-out duration-700'>
							Register
						</Link>
					</div>
				)}
			</nav>
		</header>
	)
}

export default Header
