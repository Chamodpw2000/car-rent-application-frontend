import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';


import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  IconButton,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CarForm = () => {
  const [isLoading, setIsLoading] = useState(false);



  const navigator = useNavigate();
  const [carData, setCarData] = useState({
    carName: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    carColor: '',
    seates: '',
    fualType: '',
    kmpl: '',
    images: [],
    type: '',
    rent: '',
    capacity: ''
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //       setCarData(prevState => ({
  //         ...prevState,
  //         image: reader.result
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file)); // Show a preview of the selected image (optional)
  //     setCarData((prevState) => ({
  //       ...prevState,
  //       image: file, // Store the file object in state for later upload
  //     }));
  //   }
  // };


  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));

    // Add new previews to existing ones
    setSelectedImages(prevImages => [...prevImages, ...newPreviewUrls]);

    // Add new files to existing ones
    setCarData(prevState => ({
      ...prevState,
      imagesToUpload: [...(prevState.imagesToUpload || []), ...newFiles]
    }));
  };



  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   // Create preview URLs for selected images
  //   const previewUrls = files.map(file => URL.createObjectURL(file));
  //   setSelectedImages(previewUrls);

  //   // Store files for upload
  //   setCarData(prevState => ({
  //     ...prevState,
  //     imagesToUpload: files
  //   }));
  // };



  // const uploadImageToCloudinary = async () => {
  //   if (!carData.image) {
  //     console.error("No image file selected for upload.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", carData.image);
  //   formData.append("upload_preset", "preset-for-file-upload"); // Replace with your Cloudinary upload preset
  //   formData.append("cloud_name", "dqbkxghlh"); // Replace with your Cloudinary cloud name

  //   try {
  //     const response = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
  //       formData
  //     );

  //     if (response.status === 200) {
  //       const imageUrl = response.data.secure_url;

  //       // Update state with the Cloudinary image URL
  //       setCarData((prevState) => ({
  //         ...prevState,
  //         image: imageUrl,
  //       }));

  //       console.log("Image uploaded successfully:", imageUrl);
  //     } else {
  //       console.error("Failed to upload image to Cloudinary.");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error.response?.data || error.message);
  //   }
  // };


  const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "preset-for-file-upload");
      formData.append("cloud_name", "dqbkxghlh");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
        formData
      );

      if (response.status === 200) {
        uploadedUrls.push({
          imageUrl: response.data.secure_url
        });
      }
    }

    return uploadedUrls;
  };



  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "preset-for-file-upload"); // Replace with your Cloudinary upload preset
  //     formData.append("cloud_name", "dqbkxghlh"); // Replace with your Cloudinary cloud name

  //     try {
  //       // Show a loader or feedback to the user while uploading
  //       const response = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
  //         formData
  //       );

  //       if (response.status === 200) {
  //         const imageUrl = response.data.secure_url;

  //         // Update state with the Cloudinary image URL
  //         setSelectedImage(imageUrl);
  //         setCarData((prevState) => ({
  //           ...prevState,
  //           image: imageUrl,
  //         }));
  //       } else {
  //         console.error("Failed to upload image to Cloudinary.");
  //         // Handle non-200 responses if necessary
  //       }
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       // Handle errors properly, e.g., show an error message to the user
  //     }
  //   }
  // };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem('jwtToken');

  //     // First upload image to Cloudinary
  //     await uploadImagesToCloudinary();

  //     // After image upload, carData.image should contain the Cloudinary URL
  //     const dataToSend = {
  //       ...carData,
  //       kmpl: parseInt(carData.kmpl, 10),
  //       rent: parseInt(carData.rent, 10),
  //       availableCount: parseInt(carData.availableCount, 10),
  //       seates: parseInt(carData.seates, 10),
  //     };

  //     console.log(carData.image);


  //     const response = await axios.post('http://localhost:8083/addcar', dataToSend, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //     });

  //     if (response.status === 200 || response.status === 201) {
  //       alert('Car details saved successfully!');
  //       setCarData({
  //         carName: '',
  //         carBrand: '',
  //         carModel: '',
  //         carYear: '',
  //         carColor: '',
  //         seates: '',
  //         fualType: '',
  //         kmpl: '',
  //         image: '',
  //         availableCount: '',
  //         rent: ''
  //       });
  //       setSelectedImage(null);
  //     }
  //   } catch (error) {
  //     console.error('Error saving car details:', error);
  //     alert('Error saving car details: ' + error.message);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const token = localStorage.getItem('jwtToken');
      const uploadedImages = await uploadImagesToCloudinary(carData.imagesToUpload);
  
      const dataToSend = {
        carName: carData.carName,
        carBrand: carData.carBrand,
        carModel: carData.carModel,
        carYear: carData.carYear,
        carColor: carData.carColor,
        seates: parseInt(carData.seates),
        fualType: carData.fualType,
        kmpl: parseInt(carData.kmpl),
        images: uploadedImages,
        rent: parseInt(carData.rent),
        type: carData.type,
        capacity: parseInt(carData.capacity)

      };
  
      const response = await axios.post('http://localhost:8083/addcar', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200 || response.status === 201) {
        alert('Car details saved successfully!');
        setCarData({
          carName: '',
          carBrand: '',
          carModel: '',
          carYear: '',
          carColor: '',
          seates: '',
          fualType: '',
          kmpl: '',
          image: '',
          type: '',
          rent: '',
          capacity: ''
        });
        setSelectedImages([]);
        navigator('/cars');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Container maxWidth="md" sx={{ mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Add New Car
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Car Name"
                name="carName"
                value={carData.carName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Car Brand"
                name="carBrand"
                value={carData.carBrand}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Car Model"
                name="carModel"
                value={carData.carModel}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                name="carYear"
                value={carData.carYear}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="carColor"
                value={carData.carColor}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Seats"
                name="seates"
                type="number"
                value={carData.seates}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fuel Type"
                name="fualType"
                value={carData.fualType}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="KMPL"
                name="kmpl"
                type="number"
                value={carData.kmpl}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  value={carData.type}
                  onChange={handleChange}
                >
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="SEDAN">SEDAN</MenuItem>
                  <MenuItem value="LUXURY">LUXURY</MenuItem>
                  <MenuItem value="SPORTS">SPORTS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rent per Day"
                name="rent"
                type="number"
                value={carData.rent}
                onChange={handleChange}
                required
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Engine Capacity"
                name="capacity"
                type="number"
                value={carData.capacity}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Car Image
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUpload />}
                sx={{ mb: 2 }}
              >
                Upload Images
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  multiple  // This enables multiple file selection
                  onChange={handleImageChange}
                />
              </Button>

              {selectedImages[0] ? (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Preview:
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {selectedImages.map((imageUrl, index) => (
                      <Grid item xs={4} key={index}>
                        <img
                          src={imageUrl}
                          alt={`Car preview ${index + 1}`}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '200px',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        />
                        <IconButton
                          onClick={() => removeImage(index)}
                          sx={{ position: 'absolute', top: 5, right: 5 }}
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    ))}
                  </Grid>

                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No image selected. Default image will be used.
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
            <Button
  type="submit"
  variant="contained"
  color="primary"
  fullWidth
  size="large"
  disabled={isLoading}
  sx={{ mt: 2 }}
>
  {isLoading ? (
    <CircularProgress size={24} color="inherit" />
  ) : (
    'Save Car Details'
  )}
</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CarForm;
