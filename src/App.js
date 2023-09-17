// import React from "react";
// import { useRef } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoadLocalIFC from "./components/LoadLocalIFC";
// import { DataProvider } from "./components/context";
// import LandingPage from "./components/LandingPage";
// import FormRegister from "./components/FormRegister";
// import { useTheme, useMediaQuery } from '@mui/material';

// function App() {
//     const viewerRef = useRef(null);
//     const theme = useTheme();
// 	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     return (
//         <DataProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={
//                         <div className="App" style={{ display: 'flex' }}>
//                             <div style={{ flex: isMobile ? 1 : 0.8 }}>
//                                 <LandingPage />
//                             </div>
//                             <div style={{ flex: isMobile ? 1 : 0.2, backgroundColor: theme.palette.white }}>
//                                 <FormRegister />
//                             </div>
//                         </div>
//                     } />
                    
//                     <Route path="/visualizador" element={<LoadLocalIFC viewerRef={viewerRef} />} />
//                 </Routes>
//             </Router>
//         </DataProvider>
//     );
// }

// export default App;
// import React from "react";
// import { useRef } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoadLocalIFC from "./components/LoadLocalIFC";
// import { DataProvider } from "./components/context";
// import LandingPage from "./components/LandingPage";
// import FormRegister from "./components/FormRegister";
// import { useTheme, useMediaQuery } from '@mui/material';

// function App() {
//     const viewerRef = useRef(null);
//     const theme = useTheme();

//     // Definir las breakpoints
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // sm es para small, puedes ajustarlo a tu necesidad

//     return (
//         <DataProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={
//                         <div className="App" style={{ display: 'flex' }}>
//                             <div style={{ flex: isMobile ? 1 : 0.8 }}>
//                                 <LandingPage />
//                             </div>
//                             <div style={{ flex: isMobile ? 1 : 0.2, backgroundColor: theme.palette.white }}>
//                                 <FormRegister />
//                             </div>
//                         </div>
//                     } />
                    
//                     <Route path="/visualizador" element={<LoadLocalIFC viewerRef={viewerRef} />} />
//                 </Routes>
//             </Router>
//         </DataProvider>
//     );
// }

// export default App;

import React from "react";
import { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadLocalIFC from "./components/LoadLocalIFC";
import { DataProvider } from "./components/context";
import LandingPage from "./components/LandingPage";
import FormRegister from "./components/FormRegister";
import { useTheme, useMediaQuery } from '@mui/material';

function App() {
    const viewerRef = useRef(null);
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    let landingFlex = 0.8;
    let registerFlex = 0.2;

    let videoWidth = '100%';
    let videoHeight = '100%';

    if (isMobile) {
        landingFlex = 1;
        registerFlex = 1;
        videoWidth = '100vw'; // Esto hace que el video tenga el ancho del viewport en móviles
        videoHeight = '50vh'; // Ajusta este valor si necesitas que el video tenga un alto específico en móviles
    } else if (isMedium) {
        landingFlex = 0.7;
        registerFlex = 0.3;
        videoWidth = '70vw'; 
        videoHeight = '70vh';
    }

    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <div className="App" style={{ display: 'flex' }}>
                            <div style={{ flex: landingFlex }}>
                                <LandingPage videoWidth={videoWidth} videoHeight={videoHeight} />
                            </div>
                            <div style={{ flex: registerFlex, backgroundColor: theme.palette.white }}>
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
