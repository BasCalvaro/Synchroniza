// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
// import { IfcViewerAPI } from "web-ifc-viewer";
// import { Color } from "three";

// export const FileUploadContext = createContext();

// export const useFileUpload = () => {
//   const context = useContext(FileUploadContext);
//   if (!context) {
//     throw new Error("useFileUpload debe estar dentro de un FileUploadProvider");
//   }
//   return context;
// };

// export const FileUploadProvider = ({ children }) => {
//   const viewerRef = useRef(null);
//   const [treeData, setTreeData] = useState(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const container = document.getElementById("viewer-container");
//     const viewer = new IfcViewerAPI({ container, backgroundColor: new Color()});

//     viewer.IFC.setWasmPath("../../");
//     viewerRef.current = viewer;

//   }, []);

//   const handleFileChanges = async (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       try {
//         const model = await viewerRef.current.IFC.loadIfc(selectedFile, true);
//         const spatialStructure = await viewerRef.current.IFC.getSpatialStructure(model.modelID);
//         setTreeData(spatialStructure);
//       } catch (error) {
//         console.log("Error loading model:", error);
//       }
//     }
//   };

//   const handleFileUpload = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <FileUploadContext.Provider value={{
//       handleFileChanges,
//       viewerRef,
//       treeData,
//       setTreeData
//     }}>
//       <button onClick={handleFileUpload}>Cargar Archivo</button>
//       <input
//         type="file"
//         style={{ display: "none" }}
//         ref={fileInputRef}
//         onChange={handleFileChanges}
//       />
//       {children}
//     </FileUploadContext.Provider>
//   );
// };
