import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CarTable from '../compornants/CarTable';
import { useNavigate } from 'react-router-dom';



const ManageCars = () => {

  const navigator = useNavigate();



  const handleEdit = (car) => {
    // Handle edit action
    navigator(`/admin/editcar/${car.id}`);


  };

  const handleDelete = (carId) => {
    // Handle delete action
    console.log('Delete car with ID:', carId);
  };
  const [cars, setCars] = useState([])
  useEffect( () => {

    const fetchCars = async () => {
      try {
          
          const response = await axios.get('http://localhost:8083/getcars');
          setCars(response.data || []);
          
      } catch (error) {
          
          setCars([]);
      } 
  };

  fetchCars();



  }, [])


  return (


    <div>



<div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Car List</h1>
      <CarTable
        cars={cars} // Your car data array
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>









    </div>
  )
}

export default ManageCars