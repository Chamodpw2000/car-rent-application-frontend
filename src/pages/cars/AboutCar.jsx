import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './cars.css';

const CarDetails = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [carData, setCarData] = useState({
    images: [],
    carName: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    carColor: '',
    seates: 0,
    fualType: '',
    kmpl: 0,
    type: '',
    capacity: 0,
    availability: true,
    rent: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      window.scrollTo(0, 0);
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8083/getcar/${id}`);
        setCarData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch car details');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleCheckAvailability = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    // Add your availability check logic here
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">{error}</div>
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="w-full">
            {carData.images && carData.images.length > 0 ? (
              <div className="rounded-lg overflow-hidden">
                <Carousel
                  showArrows={true}
                  showThumbs={true}
                  infiniteLoop={true}
                  className="custom-carousel"
                >
                  {carData.images.map((image, index) => (
                    <div key={index} className="h-[500px]">
                      <img
                        src={image.imageUrl}
                        alt={`${carData.carName || 'Car'} - ${index + 1}`}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            ) : (
              <div className="h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No Images Available</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{carData.carName || 'N/A'}</h1>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Brand', value: carData.carBrand },
                { label: 'Model', value: carData.carModel },
                { label: 'Year', value: carData.carYear },
                { label: 'Color', value: carData.carColor },
                { label: 'Seats', value: carData.seates },
                { label: 'Fuel Type', value: carData.fualType },
                { label: 'Fuel Efficiency', value: `${carData.kmpl} kmpl` },
                { label: 'Type', value: carData.type },
                { label: 'Engine Capacity', value: `${carData.capacity} cc` },
                { label: 'Status', value: carData.availability ? 'Available' : 'Not Available' }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value || 'N/A'}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                LKR {carData.rent ? carData.rent.toLocaleString() : 'N/A'}
                <span className="text-lg text-green-500 font-normal"> / Day</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholderText="Select start date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholderText="Select end date"
                  />
                </div>
              </div>

              <Button
                variant="contained"
                onClick={handleCheckAvailability}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                disabled={!startDate || !endDate}
              >
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
