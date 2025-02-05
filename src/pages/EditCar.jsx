import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import { CircularProgress } from '@mui/material';

import CryptoJS from 'crypto-js';


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
const EditCar = () => {


  // const deleteImagesFromCloudinary = async (publicIds) => {
  //   const deletedResults = [];

  //   for (const publicId of publicIds) {
  //     const formData = new FormData();
  //     formData.append("public_id", publicId);
  //     formData.append("api_key", "798218248754595");
  //     formData.append("timestamp", Math.round(new Date().getTime() / 1000));
  //     console.log(publicId);

  //     console.log(formData);
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0] + ': ' + pair[1]);
  //   }



  //     try {
  //       const response = await axios.post(
  //         "https://api.cloudinary.com/v1_1/dqbkxghlh/image/destroy",
  //         formData
  //       );

  //       if (response.status === 200) {
  //         deletedResults.push({
  //           publicId,
  //           status: "deleted"
  //         });
  //       }
  //     } catch (error) {

  //       deletedResults.push({
  //         publicId,
  //         status: "failed",
  //         error: error.message
  //       });
  //     }
  //   }

  //   return deletedResults;
  // };

  // Helper function to extract public ID from Cloudinary URL
  const getPublicIdFromUrl = (url) => {
    const splitUrl = url.split('/');
    const publicIdWithExtension = splitUrl[splitUrl.length - 1];
    return publicIdWithExtension.split('.')[0];
  };

  const deleteImagesFromMongo = async (id) => {
    const token = localStorage.getItem('jwtToken');

    const Authorization = `Bearer ${token}`;
    console.log(Authorization);


    try {
      const response = await axios.delete(`http://localhost:8083/deleteimages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    } catch (e) {
      console.log(e);
    }

  };

  const [imagesToRemove, setImagesToRemove] = useState([]);

  const deleteImagesFromCloudinary = async (publicIds) => {
    const deletedResults = [];

    for (const publicId of publicIds) {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const apiKey = "798218248754595";
      const apiSecret = "8q9WAeXqTlrZkl0wVDJsn6BLAts"; // Get this from your Cloudinary dashboard

      // Generate signature
      const signature = generateSignature(publicId, apiSecret, timestamp);

      const formData = new FormData();
      formData.append("public_id", publicId);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dqbkxghlh/image/destroy",
          formData
        );

        if (response.status === 200) {
          console.log(response);

          deletedResults.push({
            publicId,
            status: "deleted"
          });
        }
      } catch (error) {
        deletedResults.push({
          publicId,
          status: "failed",
          error: error.message
        });
      }
    }
    return deletedResults;
  };

  const generateSignature = (publicId, apiSecret, timestamp) => {

    const str = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    return CryptoJS.SHA1(str).toString();
  };



  const CLOUDINARY_API_KEY = "798218248754595"
  const CLOUDINARY_SECRET_KEY = "8q9WAeXqTlrZkl0wVDJsn6BLAts"

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



  const handleSubmit = async (e) => {

    console.log("images to remove");
    console.log(imagesToRemove);
    console.log("initial images");
    console.log(initialImages);
    
    


    e.preventDefault();
    setIsLoading(true);
    let publicIdsToDelete = [];
    for (const url of imagesToRemove) {
      let pid = getPublicIdFromUrl(url);
      publicIdsToDelete.push(pid);
    }

    console.log(publicIdsToDelete);

    await deleteImagesFromCloudinary(publicIdsToDelete);
    console.log(carData.id);

    await deleteImagesFromMongo(carData.id);

    try {
      const token = localStorage.getItem('jwtToken');
      console.log(carData.imagesToUpload);

      let tempuploadedImages = [];

      if (carData.imagesToUpload && carData.imagesToUpload.length !== 0) {
        tempuploadedImages = await uploadImagesToCloudinary(carData.imagesToUpload);
      }
      



      console.log("uploaded images==================================");

      

      console.log("initial images==================================");
      console.log(initialImages);

      const uploadedImages = [...initialImages?.map(img => ({ imageUrl: img })), ...tempuploadedImages];
      

console.log(uploadedImages);





      const dataToSend = {
        id: carData.id,
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


      console.log(dataToSend);
      

      const response = await axios.post('http://localhost:8083/addcar', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Car details Updated successfully!');
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







    setIsLoading(false);







  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
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




  const [selectedImages, setSelectedImages] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);




  const { id } = useParams();

  const [carData, setCarData] = useState({

    carName: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    carColor: '',
    seates: '',
    fualType: '',
    kmpl: '',
    type: '',
    rent: '',
    id: '',
    images: [],


    capacity: '',

  });




  useEffect(() => {

    console.log(id);



    const fetchCar = async () => {


      try {
        const response = await axios.get(`http://localhost:8083/getcar/${id}`);
        console.log(response.data);

        setCarData(response.data || []);
        if (response.data.images && response.data.images.length > 0) {
          const imageUrls = response.data.images.map(img => img.imageUrl);
          setSelectedImages(imageUrls);
          setInitialImages(imageUrls);
        }


      } catch (error) {
        console.log(error);


      }
    }
    fetchCar();

  }, [])


  const removeImage = (indexToRemove) => {
    let removedImageUrl = initialImages[indexToRemove];

    if(removedImageUrl===undefined){
      removedImageUrl=selectedImages[indexToRemove];
    }


    setImagesToRemove(prev => [...(prev || []), removedImageUrl]);



    // Remove from preview images
    setSelectedImages(prevImages =>
      prevImages?.filter((_, index) => index !== indexToRemove)
    );

    setInitialImages(prevImages =>
      prevImages?.filter((_, index) => index !== indexToRemove)
    );




    // Remove from files to upload
    setCarData(prevState => ({
      ...prevState,
      imagesToUpload: prevState.imagesToUpload?.filter((_, index) => index !== indexToRemove)
    }));
  };



  return (
    <div>



      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center" >
            Update Car
          </Typography>
          <Box className="mt-5" component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>


              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Car Id"
                  name="carId"
                  value={carData.id}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Grid>




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
                          <Box sx={{ position: 'relative' }}>
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
                              sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                                }
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
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



    </div>
  )
}

export default EditCar