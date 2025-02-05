import React from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import CarForm from '../cars/AddCar'
import Summary from '../Summary'
import ManageBookings from '../ManageBookings'
import ManageFeedbacks from '../ManageFeedbacks'
import ManageUsers from '../ManageUsers'
import ManageCars from '../ManageCars'
import EditCar from '../EditCar'
import './AdminDashboard.css'

const AdminDashboard = () => {
    const location = useLocation();

    const isActiveLink = (path) => {
        return location.pathname === `/admin${path}` ? 'bg-[#1976d2] text-white' : 'text-blue-900 hover:bg-[#1976d2] hover:text-white';
    };

    const navLinks = [
        { path: "", text: "Summary", icon: "📊" },
        { path: "/addcar", text: "Add Cars", icon: "🚗" },
        { path: "/managecars", text: "Manage Cars", icon: "🔧" },
        { path: "/manageusers", text: "Manage Users", icon: "👥" },
        { path: "/managefeedbacks", text: "Manage Feedbacks", icon: "📝" },
        { path: "/managebookings", text: "Manage Bookings", icon: "📅" },
    ];

    return (
        <div className='flex min-h-screen bg-gray-100'>
            {/* Sidebar */}
            <div className="w-[300px] bg-white shadow-lg">
                <div className="p-6 bg-[#1976d2]">
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                </div>
                <nav className="mt-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={`/admin${link.path}`}
                            className={`flex items-center px-6 py-4 transition-all duration-200 ease-in-out ${isActiveLink(link.path)}`}
                        >
                            <span className="mr-4">{link.icon}</span>
                            <span className="font-medium">{link.text}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="p-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <Routes>
                            <Route path="addcar" element={<CarForm/>} />
                            <Route path="managecars" element={<ManageCars/>} />
                            <Route path="manageusers" element={<ManageUsers/>} />
                            <Route path="managefeedbacks" element={<ManageFeedbacks/>} />
                            <Route path="" element={<Summary/>} />
                            <Route path="managebookings" element={<ManageBookings/>} />
                            <Route path="editcar/:id" element={<EditCar/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
