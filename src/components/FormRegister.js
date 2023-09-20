import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
	Button,
	TextField,
	Grid,
	Container,
	Typography,
	Box,
} from "@mui/material";



function FormRegister() {
	const navigate = useNavigate();
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const StyledContainer = styled(Container)(({ theme }) => ({
		backgroundColor: theme.palette.white,
	}));

	const [formData, setFormData] = useState({
		nombre: "",
		email: "",
	});

	const { nombre, email } = formData;

	const handleSubmit = (event) => {
		event.preventDefault();

		const updatedFormData = {
			nombre: event.target.nombre.value,
			email: event.target.email.value,
		};
		console.log("Datos enviados:", formData);

		setFormData(updatedFormData);
		setOpenSnackbar(true);
	};

	return (
		<Box>
			<StyledContainer component="main" maxWidth="xs" sx={{ mt: 5 }}>
				<Typography component="h1" variant="h5">
					Registro
				</Typography>

				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1 },
					}}
					noValidate
					autoComplete="off"
					onSubmit={handleSubmit}
				>
					<TextField
						id="nombre"
						name="nombre"
						label="Nombre completo"
						variant="outlined"
						fullWidth
						sx={{ mt: 2 }}
					/>
					<TextField
						id="email"
						name="email"
						label="Email"
						variant="outlined"
						fullWidth
						sx={{ mt: 2 }}
					/>

					<Button type="submit" variant="outlined" fullWidth sx={{ mt: 2 }}>
						Solicitar Demo
					</Button>
				</Box>

				{/* ------------------------------------------------------------------ */}
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="100vh"
				>
					<Button
						sx={{
							mt: 5,
							borderRadius: "50%",
							width: "150px",
							height: "150px",
							fontSize: "16px",
						}}
						variant="contained"
						color="success"
						onClick={() => navigate("/visualizador")}
					>
						Ir a visualizador 3D
					</Button>
				</Box>
				<Snackbar
					open={openSnackbar}
					autoHideDuration={3000}
					onClose={() => setOpenSnackbar(false)}
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
				>
					<Alert
						onClose={() => setOpenSnackbar(false)}
						severity="success"
						variant="filled"
					>
						¡Recibimos tu Solicitud con exito!
					</Alert>
				</Snackbar>
			</StyledContainer>
		</Box>
	);
}

export default FormRegister;
