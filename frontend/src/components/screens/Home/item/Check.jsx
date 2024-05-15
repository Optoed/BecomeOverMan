import React, { useState, useEffect } from 'react'
import { BsCheck } from 'react-icons/bs'

const Check = ({ isCompleted }) => {
	const [completed, setCompleted] = useState(false)

	useEffect(() => {
		const fetchCompletedStatus = async () => {
			const completedStatus = await isCompleted()
			setCompleted(completedStatus)
		}
		fetchCompletedStatus()
	}, [isCompleted])

	return <div className={`border-2 rounded-lg border-pink-600 hover:border-pink-500 ${completed ? 'bg-pink-600 hover:bg-pink-500' : ''} w-6 h-6 mr-3 flex items-center justify-center transition-colors ease-in-out duration-300`}>{completed && <BsCheck size={24} className='text-gray-900' />}</div>
}

export default Check
