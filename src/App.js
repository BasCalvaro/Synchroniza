import React, { useState } from "react";
import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import LoadLocalIFC from "./components/LoadLocalIFC";
import { DataProvider } from "./components/context";
import LandingPage from "./components/LandingPage";
import FormRegister from "./components/FormRegister";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
});

function App() {
	const [theme, setTheme] = useState(lightTheme);

	const toggleTheme = () => {
		setTheme(theme === darkTheme ? lightTheme : darkTheme);
	};

	const viewerRef = useRef(null);
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<DataProvider>
				<Router>
					<Routes>
						<Route
							path="/"
							element={
								<div className="App" style={{ display: "flex" }}>
									<div style={{ flex: isMobile ? 1 : 0.8 }}>
										<LandingPage />
									</div>
									<div
										style={{
											flex: isMobile ? 1 : 0.2,
											backgroundColor: theme.palette.white,
										}}
									>
										<FormRegister />
									</div>
								</div>
							}
						/>
						<Route
							path="/visualizador"
							element={<LoadLocalIFC viewerRef={viewerRef} />}
						/>
					</Routes>
				</Router>
				<IconButton
					sx={{ ml: 1, position: "fixed", top: "1%", right: ".5%" }}
					onClick={toggleTheme}
					color="inherit"
				>
					{theme.palette.mode === "dark" ? (
						<Brightness7Icon />
					) : (
						<Brightness4Icon />
					)}
				</IconButton>
			</DataProvider>
		</ThemeProvider>
	);
}

export default App;
