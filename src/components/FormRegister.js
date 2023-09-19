import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Form, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
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
            email: ''
        });

        const { nombre, email} = formData;

        const handleOnChange = (e) => {
            const { name, value } = e.target;
            
            console.log('Campo:', name);  // Mostrará "nombre" o "email"
            console.log('Valor:', value); // Mostrará lo que escribiste
        
            setFormData({ ...formData, [name]: value });
        
            
        };
        

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log("submit",e);
            // Aquí puedes procesar los datos, como enviarlos a una API, etc.
            setOpenSnackbar(true);
        };

  return (

    <Box>
    <StyledContainer component="main" maxWidth="xs" sx={{mt:5}}>
        <Typography component="h1" variant="h5">
            Registro
        </Typography>
   
        <Box component="form" onSubmit={handleSubmit}>


                    <TextField
                        autoFocus
                        name="nombre"
                        id="nombre"
                        label="Nombre completo"
                        variant="outlined"
                        fullWidth
                        value={nombre}
                        onChange={handleOnChange}
                        sx={{ mt: 2 }}
                    />
                    
                    <TextField
                       
                        name="email"
                        id="email"
                        label="email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        // helperText="Ingrese un nombre mínimo 8 caracteres"
                        // error={true}
                        value={email}
                        onChange={handleOnChange}
                        sx={{ mt: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Solicitar Demo
                    </Button>
                </Box>



    {/* ------------------------------------------------------------------ */}
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">        
            <Button 
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
                    Ir a visualizador 3D
            </Button>
        </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
                        ¡Recibimos tu Solicitud con exito!
                    </Alert>
                </Snackbar> 
            </StyledContainer>
    </Box>
  );
}

export default FormRegister;
 