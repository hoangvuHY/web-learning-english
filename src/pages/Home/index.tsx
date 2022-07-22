import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const HomeComponent = () => {
  return <div onClick={() => {
    console.log('dfsdfsdf');

    <Navigate to="/login" />
  }}>Main page</div>;
};

export default HomeComponent;
