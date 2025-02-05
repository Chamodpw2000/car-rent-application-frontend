


import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    Link,
    Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <Box sx={{
            bgcolor: (theme) => theme.palette.primary.main, // This matches the navbar color
            color: 'white',
            pt: 6,
            pb: 3
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Company Info */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Easy Cabz
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Your trusted partner for premium car rentals. Experience comfort and luxury on every journey.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton color="inherit" aria-label="Facebook">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="Twitter">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="Instagram">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="LinkedIn">
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link component={RouterLink} to="/" color="inherit" underline="hover">
                                Home
                            </Link>
                            <Link component={RouterLink} to="/cars" color="inherit" underline="hover">
                                Cars
                            </Link>
                            <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                                About Us
                            </Link>
                            <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                                Contact
                            </Link>
                        </Box>
                    </Grid>

                    {/* Services */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Our Services
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="#" color="inherit" underline="hover">
                                Luxury Cars
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Business Rentals
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Airport Transfer
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Wedding Cars
                            </Link>
                        </Box>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon />
                                <Typography variant="body2">
                                    123 Business Avenue, City, Country
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon />
                                <Typography variant="body2">
                                    +1 234 567 8900
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon />
                                <Typography variant="body2">
                                    info@easycabz.com
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 4, mb: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Copyright */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="inherit">
                        © {new Date().getFullYear()} Easy Cabz. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

//

export default Footer;
