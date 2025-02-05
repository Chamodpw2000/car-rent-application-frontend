import React from 'react'

const CarTable = ({ cars, onEdit, onDelete }) => {
  return (
    <div>

<div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Model</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Brand</th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cars.map((car) => (
            <tr key={car.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.carName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.carModel}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.carBrand}</td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  <button
    onClick={() => onEdit(car)}
    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 mr-4 font-semibold shadow-sm"
  >
    <span className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
      Edit
    </span>
  </button>
  
  <button
    onClick={() => onDelete(car.id)}
    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 font-semibold shadow-sm"
  >
    <span className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Delete
    </span>
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>




    </div>
  )
}

export default CarTable