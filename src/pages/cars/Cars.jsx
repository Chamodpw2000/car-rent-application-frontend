import React, { useContext, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Button,
    Box,
    Rating,
    Chip,
    buttonBaseClasses
} from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import { UserContext } from '../../App';


const categories = ['All', 'SUV', 'Sedan', 'Luxury', 'Sports'];

const carsData = [

    {
        id: 1,
        name: 'Range Rover Sport',
        category: 'SUV',
        price: 350,
        image: 'https://picsum.photos/400/300',
        rating: 4.7,
        specs: {
            seats: 5,
            fuelType: 'Diesel',
            mileage: '12 kmpl'
        }
    },
    {
        id: 2,
        name: 'BMW X5',
        category: 'SUV',
        price: 300,
        image: 'https://picsum.photos/400/300',
        rating: 4.6,
        specs: {
            seats: 5,
            fuelType: 'Petrol',
            mileage: '11 kmpl'
        }
    },
    {
        id: 3,
        name: 'Mercedes-Benz GLE',
        category: 'SUV',
        price: 400,
        image: 'https://picsum.photos/400/300',
        rating: 4.8,
        specs: {
            seats: 5,
            fuelType: 'Diesel',
            mileage: '10 kmpl'
        }
    },
    {
        id: 4,
        name: 'Toyota Fortuner',
        category: 'SUV',
        price: 250,
        image: 'https://picsum.photos/400/300',
        rating: 4.5,
        specs: {
            seats: 7,
            fuelType: 'Diesel',
            mileage: '13 kmpl'
        }
    },
    {
        id: 5,
        name: 'Audi Q7',
        category: 'SUV',
        price: 500,
        image: 'https://picsum.photos/400/300',
        rating: 4.9,
        specs: {
            seats: 7,
            fuelType: 'Petrol',
            mileage: '8 kmpl'
        }
    },
    {
        id: 6,
        name: 'Tesla Model S',
        category: 'Sedan',
        price: 600,
        image: 'https://picsum.photos/400/300',
        rating: 4.9,
        specs: {
            seats: 5,
            fuelType: 'Electric',
            mileage: '500 km per charge'
        }
    },
    {
        id: 7,
        name: 'BMW 3 Series',
        category: 'Sedan',
        price: 350,
        image: 'https://picsum.photos/400/300',
        rating: 4.7,
        specs: {
            seats: 5,
            fuelType: 'Petrol',
            mileage: '15 kmpl'
        }
    },
    {
        id: 8,
        name: 'Audi A6',
        category: 'Sedan',
        price: 400,
        image: 'https://picsum.photos/400/300',
        rating: 4.8,
        specs: {
            seats: 5,
            fuelType: 'Diesel',
            mileage: '14 kmpl'
        }
    },
    {
        id: 9,
        name: 'Mercedes-Benz C-Class',
        category: 'Sedan',
        price: 450,
        image: 'https://picsum.photos/400/300',
        rating: 4.8,
        specs: {
            seats: 5,
            fuelType: 'Petrol',
            mileage: '12 kmpl'
        }
    },
    {
        id: 10,
        name: 'Honda Accord',
        category: 'Sedan',
        price: 250,
        image: 'https://picsum.photos/400/300',
        rating: 4.6,
        specs: {
            seats: 5,
            fuelType: 'Petrol',
            mileage: '17 kmpl'
        }
    },
    {
        id: 11,
        name: 'Rolls Royce Phantom',
        category: 'Luxury',
        price: 1000,
        image: 'https://picsum.photos/400/300',
        rating: 5.0,
        specs: {
            seats: 4,
            fuelType: 'Petrol',
            mileage: '6 kmpl'
        }
    },
    {
        id: 12,
        name: 'Bentley Bentayga',
        category: 'Luxury',
        price: 900,
        image: 'https://picsum.photos/400/300',
        rating: 4.9,
        specs: {
            seats: 4,
            fuelType: 'Petrol',
            mileage: '7 kmpl'
        }
    },
    {
        id: 13,
        name: 'Lexus LS',
        category: 'Luxury',
        price: 700,
        image: 'https://picsum.photos/400/300',
        rating: 4.8,
        specs: {
            seats: 5,
            fuelType: 'Hybrid',
            mileage: '15 kmpl'
        }
    },
    {
        id: 14,
        name: 'Porsche Panamera',
        category: 'Luxury',
        price: 800,
        image: 'https://picsum.photos/400/300',
        rating: 4.9,
        specs: {
            seats: 4,
            fuelType: 'Petrol',
            mileage: '9 kmpl'
        }
    },
    {
        id: 15,
        name: 'Maserati Quattroporte',
        category: 'Luxury',
        price: 750,
        image: 'https://picsum.photos/400/300',
        rating: 4.8,
        specs: {
            seats: 5,
            fuelType: 'Petrol',
            mileage: '8 kmpl'
        }
    },
    {
        id: 16,
        name: 'Ferrari Roma',
        category: 'Sports',
        price: 850,
        image: 'https://picsum.photos/400/300',
        rating: 4.9,
        specs: {
            seats: 2,
            fuelType: 'Petrol',
            mileage: '7 kmpl'
        }
    },
    {
        id: 17,
        name: 'Lamborghini Huracan',
        category: 'Sports',
        price: 900,
        image: 'https://picsum.photos/400/300',
        rating: 5.0,
        specs: {
            seats: 2,
            fuelType: 'Petrol',
            mileage: '5 kmpl'
        }
    },
    {
        id: 18,
        name: 'Porsche 911',
        category: 'Sports',
        price: 800,
        image: 'https://picsum.photos/400/300',
        rating: 4.9,
        specs: {
            seats: 2,
            fuelType: 'Petrol',
            mileage: '8 kmpl'
        }
    },
    {
        id: 19,
        name: 'McLaren GT',
        category: 'Sports',
        price: 950,
        image: 'https://picsum.photos/400/300',
        rating: 5.0,
        specs: {
            seats: 2,
            fuelType: 'Petrol',
            mileage: '6 kmpl'
        }
    },
    {
        id: 20,
        name: 'Chevrolet Corvette',
        category: 'Sports',
        price: 700,
        image: 'https://picsum.photos/400/300',
        rating: 4.8,
        specs: {
            seats: 2,
            fuelType: 'Petrol',
            mileage: '10 kmpl'
        }
    }
];

const Cars = () => {

    const { user, setUser } = useContext(UserContext);

    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    const filteredCars = selectedCategory === 'All'
        ? carsData
        : carsData.filter(car => car.category === selectedCategory);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>


            {user?.role[0].roleName === "Admin" ? (
    <Button
        variant="contained"
        color="primary"
        href="/addcar"
        sx={{
            width: "100%",    // Full width
            height: "56px",   // Increase button height (adjust as needed)
            fontSize: "16px", // Increase font size
            fontWeight: "bold", // Make the text bold
        }}
    >
        Add New Car
    </Button>
) : null}

                <Tabs
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {categories.map((category) => (
                        <Tab key={category} label={category} value={category} />
                    ))}
                </Tabs>
            </Box>

            <Grid container spacing={4}>
                {filteredCars.map((car) => (
                    <Grid item key={car.id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={car.image}
                                alt={car.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {car.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={car.rating} precision={0.5} readOnly size="small" />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                        ({car.rating})
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                    <Chip
                                        icon={<PeopleIcon />}
                                        label={`${car.specs.seats} Seats`}
                                        size="small"
                                    />
                                    <Chip
                                        icon={<LocalGasStationIcon />}
                                        label={car.specs.fuelType}
                                        size="small"
                                    />
                                    <Chip
                                        icon={<SpeedIcon />}
                                        label={car.specs.mileage}
                                        size="small"
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" color="primary">
                                        ${car.price}/day
                                    </Typography>
                                    {user?.role[0].roleName == "Admin" ?

                                        <Button variant="contained" color="primary">
                                            Edit
                                        </Button> : null


                                    }

                                    {user?.role[0].roleName == "User" ?

                                        <Button variant="contained" color="primary">
                                            Rent Now
                                        </Button> : null


                                    }

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Cars;
