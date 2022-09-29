import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UploadCsvFile from "./pages/UploadCsv/UploadCsvFile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadCsvFile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
