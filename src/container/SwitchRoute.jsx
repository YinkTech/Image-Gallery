import React from "react";
import App from "./App";
import { Route, Routes } from "react-router-dom";

const SwitchRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} exact />
        {/* <Route path="/movies/:id" element={<Details />} /> */}
      </Routes>
    </>
  );
};

export default SwitchRoute;
