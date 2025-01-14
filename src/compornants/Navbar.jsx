import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { UserContext } from '../App';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [loginData, setLoginData] = useState({ userEmail: '', userPassword: '' });
  const [signUpData, setSignUpData] = useState({
    userEmail: '',
    userPassword: '',
    conformUserPassword: '',
    firstName: "",
    lastName: "",
    mobileNumber: "",
    userAddress: "",
    nic: ""

  });
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateSignUpForm = () => {
    let tempErrors = {};

    // Email validation
    if (!signUpData.userEmail) {
      tempErrors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.userEmail)) {
      tempErrors.userEmail = "Email is invalid";
    }

    // First Name validation
    if (!signUpData.firstName) {
      tempErrors.firstName = "First name is required";
    } else if (signUpData.firstName.length < 2) {
      tempErrors.firstName = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!signUpData.lastName) {
      tempErrors.lastName = "Last name is required";
    }

    // NIC validation
    if (!signUpData.nic) {
      tempErrors.nic = "NIC is required";
    } else if (!/^\d{9}[vVxX]$|^\d{12}$/.test(signUpData.nic)) {
      tempErrors.nic = "Invalid NIC format";
    }

    // Mobile Number validation
    if (!signUpData.mobileNumber) {
      tempErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(signUpData.mobileNumber)) {
      tempErrors.mobileNumber = "Invalid mobile number";
    }

    // Address validation
    if (!signUpData.userAddress) {
      tempErrors.userAddress = "Address is required";
    }

    // Password validation
    if (!signUpData.userPassword) {
      tempErrors.userPassword = "Password is required";
    } else if (signUpData.userPassword.length < 6) {
      tempErrors.userPassword = "Password must be at least 6 characters";
    }

    // Confirm Password validation
    if (!signUpData.conformUserPassword) {
      tempErrors.conformUserPassword = "Please confirm your password";
    } else if (signUpData.userPassword !== signUpData.conformUserPassword) {
      tempErrors.conformUserPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };



  useEffect(() => {


    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSignupClick = () => {
    setOpenSignupDialog(true);
  };

  const handleLoginClick = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginClose = () => {
    setOpenLoginDialog(false);
    setLoginData({ userEmail: '', userPassword: '' });
  };



  const handleSignupClose = () => {
    setOpenSignupDialog(false);
    setSignUpData({
      userEmail: '',
      userPassword: '',
      conformUserPassword: '',
      firstName: "",
      lastName: "",
      mobileNumber: "",
      userAddress: "",
      nic: ""
    });
  };

  const handleLogin = async () => {

    try {

      await axios.post("http://localhost:8083/authentication", loginData)


        .then(async (response) => {
          console.log(response.data.user);
          if (response.data.user != null) {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))





            setIsLoggedIn(true);
            handleLoginClose();
            window.location.reload()


          }
        }).catch((error) => {
          console.log("error is", error);
        });



    } catch (err) {
      console.log(err);

    }



  };



  const handleSignup = async () => {
    setIsSubmitting(true);

    if (validateSignUpForm()) {
      try {
        const response = await axios.post("http://localhost:8083/user/signup", signUpData);
        if (response.data) {
          handleSignupClose();
          // Show success message
          // You can use a toast notification here
        }
      } catch (error) {
        console.error("Signup failed:", error);
        // Show error message
      }
    }

    setIsSubmitting(false);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    handleClose();
    navigate('/');
    window.location.reload()

  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <DirectionsCarIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'white' }}
            >
              Easy Cabz
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {user?.role?.length > 0 && user.role[0].roleName === "Admin" ? (
              <Button color="inherit" component={RouterLink} to="/contact">
                Admin Dashboard
              </Button>
            ) : null}

            <Button color="inherit" onClick={() => { console.log(user.role[0].roleName) }} >
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/cars">
              Cars
            </Button>
            <Button color="inherit" component={RouterLink} to="/about">
              About
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              Contact
            </Button>


            {isLoggedIn ? (
              <div>
                <IconButton
                  size="large"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <AccountCircleIcon />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={RouterLink} to="/profile">Profile</MenuItem>
                  <MenuItem component={RouterLink} to="/bookings">My Bookings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleLoginClick}
                  sx={{ borderColor: 'white' }}
                >
                  Login
                </Button>

                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleSignupClick}
                  sx={{ borderColor: 'white' }}
                >
                  Signup
                </Button>


              </>


            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <Dialog open={openLoginDialog} onClose={handleLoginClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={loginData.userEmail}
            onChange={(e) => setLoginData({ ...loginData, userEmail: e.target.value })}

          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={loginData.userPassword}
            onChange={(e) => setLoginData({ ...loginData, userPassword: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>





      {/* Signup Dialog */}
      <Dialog open={openSignupDialog} onClose={handleSignupClose}>
        <DialogTitle>SignUp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={signUpData.userEmail}
            onChange={(e) => setSignUpData({ ...signUpData, userEmail: e.target.value })}
            error={Boolean(errors.userEmail)}
            helperText={errors.userEmail}
          />
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={signUpData.firstName}
            onChange={(e) => setSignUpData({ ...signUpData, userFirstName: e.target.value })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={signUpData.lastName}
            onChange={(e) => setSignUpData({ ...signUpData, userLastName: e.target.value })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />

          <TextField
            autoFocus
            margin="dense"
            label="NIC Number"
            type="text"
            fullWidth
            variant="outlined"
            value={signUpData.nic}
            onChange={(e) => setSignUpData({ ...signUpData, nic: e.target.value })}
            error={Boolean(errors.nic)}
            helperText={errors.nic}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Mobile No"
            type="text"
            fullWidth
            variant="outlined"
            value={signUpData.mobileNumber}
            onChange={(e) => setSignUpData({ ...signUpData, userFirstName: e.target.value })}
            error={Boolean(errors.mobileNumber)}
            helperText={errors.mobileNumber}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={signUpData.userAddress}
            onChange={(e) => setSignUpData({ ...signUpData, userAddress: e.target.value })}
            error={Boolean(errors.userAddress)}
            helperText={errors.userAddress}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={loginData.userPassword}
            onChange={(e) => setSignUpData({ ...signUpData, userPassword: e.target.value })}
            error={Boolean(errors.userPassword)}
            helperText={errors.userPassword}
          />

          <TextField
            margin="dense"
            label="Conform Password"
            type="password"
            fullWidth
            variant="outlined"
            value={signUpData.conformUserPassword}
            onChange={(e) => setSignUpData({ ...signUpData, conformUserPassword: e.target.value })}
            error={Boolean(errors.conformUserPassword)}
            helperText={errors.conformUserPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignupClose}>Cancel</Button>
          <Button
            onClick={handleSignup}
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
