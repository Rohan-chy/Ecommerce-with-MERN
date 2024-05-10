import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
        <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                <div className="mt-2 mb-8 w-full">
                    <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    Your History
                    </h4>
                    <p className="mt-2 px-2 text-base text-gray-600">
                   Your all purchase information, record history
                    </p>
                </div> 
                <div className="grid grid-cols-2 gap-4 px-2 w-full">
                    <div className="flex items-center justify-center border-2 rounded-2xl bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <Link to={'/myorders'} className="text-base font-medium text-navy-700 dark:text-white">
                        My Orders
                    </Link>
                    </div>

                    <div className="flex justify-center border-2 rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                        English, Spanish, Italian
                    </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                        Product Design
                    </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Work History</p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                        English, Spanish, Italian
                    </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Organization</p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                        Simmmple Web LLC
                    </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Birthday</p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                        20 July 1986
                    </p>
                    </div>
                </div>
            </div>  
        </div>
  )
}

export default Profile