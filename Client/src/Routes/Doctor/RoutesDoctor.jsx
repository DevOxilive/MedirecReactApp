import React from "react";
import ReactDom from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeDoctorScreen } from "../../Components/Doctor/HomeDoctorScreen";
import { DoctorsTableScreen } from "../../Components/Admin/AdminDoctorScreen/DoctorsTableScreen";
import { PrescriptionScreen } from '../../Components/Doctor/PrescriptionScreen';

export const RoutesDoctor = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/homeDoctor" element={<HomeDoctorScreen/>} />
          <Route path="/prescription" element={<PrescriptionScreen/>} />
          <Route path="/tableDoc"/>
        </Routes>
      </BrowserRouter>
    </>
  ); 
};
 