import React from 'react'
import { FaCar, FaUsers, FaComments, FaCalendarCheck } from 'react-icons/fa'

const SummaryCard = ({ title, icon: Icon, stats }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <Icon className="text-3xl text-blue-600" />
        </div>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-gray-700">{stat.label}</span>
              <span className="font-bold text-blue-600">{stat.value || '0'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Summary = () => {
  const summaryData = [
    {
      title: "Cars",
      icon: FaCar,
      stats: [
        { label: "All Registered Cars", value: "0" },
        { label: "Available Cars", value: "0" },
        { label: "Unavailable Cars", value: "0" }
      ]
    },
    {
      title: "Users",
      icon: FaUsers,
      stats: [
        { label: "All Registered Users", value: "0" }
      ]
    },
    {
      title: "Feedbacks",
      icon: FaComments,
      stats: [
        { label: "All Feedbacks", value: "0" },
        { label: "Approved Feedbacks", value: "0" },
        { label: "Rejected Feedbacks", value: "0" },
        { label: "Pending Feedbacks", value: "0" }
      ]
    },
    {
      title: "Bookings",
      icon: FaCalendarCheck,
      stats: [
        { label: "All Bookings", value: "0" },
        { label: "Canceled Bookings", value: "0" },
        { label: "Completed Bookings", value: "0" },
        { label: "Ongoing Bookings", value: "0" }
      ]
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {summaryData.map((data, index) => (
          <SummaryCard
            key={index}
            title={data.title}
            icon={data.icon}
            stats={data.stats}
          />
        ))}
      </div>
    </div>
  )
}

export default Summary
