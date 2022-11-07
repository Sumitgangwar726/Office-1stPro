import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Listing from "./components/dashboard/listing/Listing";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Listing />} />
        <Route path='overview' element={<div>overview</div>} />
        <Route path='listing' element={<Listing />} />
        <Route path='productLinking' element={<div>product linking</div>} />
        <Route path='setting' element={<div>setting</div>} />
        <Route path='faq' element={<div>faq</div>} />
      </Route>
    </Routes>
  );
}

export default App;
