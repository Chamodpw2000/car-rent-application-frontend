import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CarForm from '../cars/AddCar'
import Summary from '../Summary'
import ManageBookings from '../ManageBookings'
import ManageFeedbacks from '../ManageFeedbacks'
import ManageUsers from '../ManageUsers'
import ManageCars from '../ManageCars'

const AdminDashboard = () => {
    return (
        <div className='flex h-full w-full'>
            <div className="bg-blue-200 min-h-screen w-[300px] flex flex-col">
                <Link to="/admin" className="p-4 hover:bg-blue-300 font-bold text-2xl text-center">Summary</Link>
                <Link to="/admin/addcar" className="p-4 hover:bg-blue-300 font-bold text-2xl text-center">Add Cars</Link>
                <Link to="/admin/managecars" className="p-4 hover:bg-blue-300 font-bold text-2xl text-center">Manage Cars</Link>
                <Link to="/admin/manageusers" className="p-4 hover:bg-blue-300 font-bold text-2xl text-center">Manage Users</Link>
                <Link to="/admin/managefeedbacks" className="p-4 hover:bg-blue-300 font-bold text-2xl text-center">Manage Feedbacks</Link>
                <Link to="/admin/managebookings" className="p-4 hover:bg-blue-300 font-bold text-2xl text-center">Manage Bookings</Link>
            </div>

            <div className="bg-blue-100 min-h-screen w-full">
                <Routes>
                    <Route path="addcar" element={<CarForm/>} />
                    <Route path="managecars" element={<ManageCars/>} />
                    <Route path="manageusers" element={<ManageUsers/>} />
                    <Route path="managefeedbacks" element={<ManageFeedbacks/>} />
                    <Route path="" element={<Summary/>} />
                    <Route path="managebookings" element={<ManageBookings/>} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminDashboard
