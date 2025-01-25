import React, { useContext, useEffect, useState } from 'react';
import {
    Container, Grid, Box, Button, Tabs, Tab, CircularProgress, Alert
} from '@mui/material';
import { UserContext } from '../../App';
import axios from 'axios';
import CarCard from '../../compornants/CarCard';

const categories = ['All', 'SUV', 'SEDAN', 'LUXURY', 'SPORTS'];

const Cars = () => {
    const [carsData, setCarsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext) || {};
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8083/getcars');
                setCarsData(response.data || []);
                setError(null);
            } catch (error) {
                setError('Failed to fetch cars data. Please try again later.');
                setCarsData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    const filteredCars = selectedCategory === 'All'
        ? carsData
        : carsData.filter(car => car?.type === selectedCategory);

    const isAdmin = user?.role?.[0]?.roleName === "Admin";

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
               

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

            {filteredCars.length === 0 ? (
                <Alert severity="info">No cars available in this category.</Alert>
            ) : (
                <Grid container spacing={4}>
                    {filteredCars.map((car) => (
                        <Grid item key={car?.id || Math.random()} xs={12} sm={6} md={4}>
                            <CarCard carData={car} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Cars;
