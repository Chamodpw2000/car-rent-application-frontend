import React, { createContext, useEffect, useState } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './compornants/Footer';
import Navbar from './compornants/Navbar';
import Cars from './pages/cars/Cars';
import About from './pages/aboutus/About';

export const UserContext =createContext(null)

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {

  const [user,setUser]= useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      
        setUser(JSON.parse(storedUser));
    }

   
    
}, []);

  
  return (
    <ThemeProvider theme={theme}>
          <UserContext.Provider value={{user,setUser}}>


      <BrowserRouter>

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars/>} />
        <Route path="/about" element={<About/>} />

      </Routes>
      
      <Footer />

      </Box>
      
      </BrowserRouter>
      </UserContext.Provider>

    </ThemeProvider>
  );
}

export default App;
