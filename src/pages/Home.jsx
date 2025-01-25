import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import Navbar from '../compornants/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigator = useNavigate();
  return (
    <Box>

       
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" color="white" gutterBottom>
                Easy Cabz
              </Typography>
              <Typography variant="h5" color="white" paragraph>
                Rent Your Dream Car Today - Simple, Fast, and Reliable
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: 'white', color: '#2196F3' }} onClick={()=>{navigator('/cars')}}
              >
                Book Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src="https://picsum.photos/id/1/600/400
"
                alt="Car"
                style={{ width: '100%', borderRadius: '10px' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <DirectionsCarIcon sx={{ fontSize: 60, color: '#2196F3' }} />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                  Wide Selection
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Choose from our extensive fleet of vehicles for any occasion
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <SecurityIcon sx={{ fontSize: 60, color: '#2196F3' }} />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                  Safe & Secure
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  All vehicles are regularly maintained and sanitized
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <SpeedIcon sx={{ fontSize: 60, color: '#2196F3' }} />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                  Quick Booking
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Easy online booking process with instant confirmation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Popular Cars Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container>
          <Typography variant="h3" textAlign="center" gutterBottom>
            Popular Cars
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://picsum.photos/id/6/400/200
`}
                    alt={`Car ${item}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Luxury Car {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Starting from $99/day
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      fullWidth
                    >
                      Rent Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
