import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  IconButton
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = () => {
  const features = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
      title: 'Premium Fleet',
      description: 'Access to over 100+ luxury and premium vehicles'
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service and roadside assistance'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Booking',
      description: 'Safe and secure payment processing and verification'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: '/images/team/john.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'Operations Director',
      image: '/images/team/sarah.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Fleet Manager',
      image: '/images/team/michael.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      }
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={8}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Easy Cabz
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={4}>
          Redefining Your Journey Since 2015
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          We're passionate about providing exceptional car rental experiences with 
          premium vehicles and outstanding customer service.
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} mb={8}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Box color="primary.main" mb={2}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mission Statement */}
      <Box textAlign="center" mb={8}>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="text.secondary">
          To provide our customers with the most reliable, convenient, and luxurious 
          car rental experience while maintaining the highest standards of service 
          and safety.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box mb={8}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} mt={2}>
          {team.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Avatar
                    src={member.image}
                    sx={{ width: 120, height: 120, margin: '0 auto 16px' }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton href={member.social.linkedin} color="primary">
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton href={member.social.twitter} color="primary">
                      <TwitterIcon />
                    </IconButton>
                    <IconButton href={member.social.facebook} color="primary">
                      <FacebookIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={4} textAlign="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h3" color="primary" gutterBottom>
            10K+
          </Typography>
          <Typography variant="body1">Happy Customers</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3" color="primary" gutterBottom>
            100+
          </Typography>
          <Typography variant="body1">Premium Vehicles</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3" color="primary" gutterBottom>
            50+
          </Typography>
          <Typography variant="body1">Cities Covered</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
