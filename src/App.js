import React from "react";
import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadLocalIFC from "./components/LoadLocalIFC";
import { DataProvider } from "./components/context";
import LandingPage from "./components/LandingPage";
import FormRegister from "./components/FormRegister";
import { useTheme, Container } from '@mui/material';

function App() {
    const viewerRef = useRef(null);
    const theme = useTheme();

    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <div className="App" style={{ display: 'flex' }}>
                            <div style={{ flex: 0.8 }}>
                                <LandingPage />
                            </div>
                            <div style={{ flex: 0.2, backgroundColor: theme.palette.white }}>
                                <FormRegister />
                            </div>
                        </div>
                    } />
                    
                    <Route path="/visualizador" element={<LoadLocalIFC viewerRef={viewerRef} />} />
                </Routes>
            </Router>
        </DataProvider>
    );
}

export default App;
