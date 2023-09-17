import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function FormRegister() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const StyledContainer = styled(Container)(({ theme }) => ({
        backgroundColor: theme.palette.white,
      }));
      
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí puedes procesar los datos, como enviarlos a una API, etc.
    setOpenSnackbar(true);
  };

  return (

    
    <StyledContainer component="main" maxWidth="xs" sx={{mt:5}}>
    {/* <Container  sx={{bgcolor: "primary.main" }} component="main" maxWidth="xs"> */}
      <Typography component="h1" variant="h5">
        Registro
      </Typography>
      <form onSubmit={handleSubmit} >
        <Grid container spacing={2} sx={{mt:2}}>
          <Grid item xs={12}>
            <TextField
              name="nombre"
              required
              fullWidth
              id="nombre"
              label="Nombre completo"
              autoFocus
              value={formData.nombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="empresa"
              required
              fullWidth
              id="empresa"
              label="empresa"
              autoFocus
              value={formData.empresa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Solicita una Demo Gratis 
            </Button>
          </Grid>
        </Grid>
      </form>
    {/* </Container> */}

    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        
        
        
        
        <Button LogoutRoundedIcon
            sx={{
            mt:5,
            borderRadius:"50%", 
            width: "150px",
            height: "150px",
            fontSize: "16px"       
        
        
        }}
            variant="contained"
            color="success"
            onClick={() => navigate("/visualizador")}>
                Ir al visualizador 3D
        </Button>
    </Box>
    <Snackbar
    open={openSnackbar}
    autoHideDuration={6000}
    onClose={() => setOpenSnackbar(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
    <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
        ¡Recibimos tu Solicitud con exito!
    </Alert>
</Snackbar>

    </StyledContainer>
  );
}

export default FormRegister;
 