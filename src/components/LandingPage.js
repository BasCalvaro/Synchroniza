import * as React from "react";
import Box from "@mui/joy/Box";
import video from "../Asset/Video.mp4";

function LandingPage() {
	const scale = 0.94;

	return (
		<Box
			sx={{
				position: "fixed", // Hace que el video se fije en el fondo
				mt: 6,
				ml: 5,
				width: "100%", // Establece el ancho al 100% del viewport
				height: "100%", // Establece el alto al 100% del viewport
				overflow: "hidden", // Esconde cualquier contenido desbordado
				zIndex: -1, // Sitúa el video detrás de otros contenidos
			}}
		>
			<video
				autoPlay
				loop
				muted
				style={{
					objectFit: "cover",
					width: `${82 * scale}%`, // Escala el ancho
					height: `${90 * scale}%`, // Escala el alto
					transform: `translate(-${(scale - 1) * 50}%, -${(scale - 1) * 50}%)`, // Centra el video
				}}
			>
				<source src={video} type="video/mp4" />
			</video>
		</Box>
	);
}

export default LandingPage;
