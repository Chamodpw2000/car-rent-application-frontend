import { useState, useEffect } from 'react';
import { 
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  styled
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const ImageContainer = styled(CardMedia)({
  height: 200,
  position: 'relative',
});

const DetailItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const PriceSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const CarCard = ({ carData }) => {

  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!carData?.images?.length) return;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === carData.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [carData?.images]);

  if (!carData) return null;

  const carDetails = [
    { label: 'Brand', value: carData.carBrand },
    { label: 'Model', value: carData.carModel },
    { label: 'Year', value: carData.carYear },
    { label: 'Color', value: carData.carColor },
    { label: 'Seats', value: carData.seates },
    { label: 'Fuel Type', value: carData.fualType },
    { label: 'Fuel Efficiency', value: `${carData.kmpl} kmpl` },
    { label: 'Engine Capacity', value: `${carData.capacity}cc` },


  ];

  return (
    <StyledCard>
      <ImageContainer
        component="img"
        image={carData.images[0]?.imageUrl || '/placeholder-image.jpg'}
        alt={carData.carName || 'Car Image'}
        onError={(e) => {
          e.target.src = '/fallback-image.jpg';
        }}
      />

      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {carData.carName}
        </Typography>

        {carDetails.map(({ label, value }) => (
          <DetailItem key={label}>
            <Typography component="span" variant="body2" fontWeight="bold">
              {label}:
            </Typography>
            <Typography component="span" variant="body2" sx={{ ml: 1 }}>
              {value}
            </Typography>

           
            
          </DetailItem>
        ))}

<Button 
  variant="contained" 
  fullWidth 
  sx={{ 
    backgroundColor: '#1976d2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1565c0',
      transform: 'scale(1.02)',
      transition: 'all 0.2s ease-in-out'
    }
  }}

  onClick={() => {navigate(`/aboutcar/${carData.id}`)}}
>
  More details
</Button>

      </CardContent>

      <PriceSection>
        <Typography variant="h6" color="primary" fontWeight="bold">
          LKR {carData.rent?.toLocaleString()  || '0'} /Day
        </Typography>
        <Chip
          label={carData.availability ? 'Available' : 'Not Available'}
          color={carData.availability ? 'success' : 'error'}
          variant="outlined"
          size="small"
        />
      </PriceSection>
    </StyledCard>
  );
};

export default CarCard;
