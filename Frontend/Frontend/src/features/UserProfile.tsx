import { useAuthStore } from '@/stores/AuthStore'
import React, { use } from 'react'

const UserProfile = () => {

    const { getUserId, getUsername, isAdmin, login, logout, token } = useAuthStore();


    return (
        <div className='absolute top-12 right-12 bg-gray-800 p-4 rounded-lg'>
            <p className='text-white'>User ID: {getUserId()}</p>
            <p className='text-white'>Username: {getUsername()}</p>
            <p className='text-white'>Role: {isAdmin() ? "Admin" : "User"}</p>
            <button onClick={logout} className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded">Logout</button>
        </div>
    )
}

export default UserProfile
