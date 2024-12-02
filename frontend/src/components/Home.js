import React from 'react';
import { Notes } from './Notes';

export const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="container p-4 bg-white rounded shadow-lg">
        <h1 className="text-center mb-4 text-primary">Welcome to Notes</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Notes />
          </div>
        </div>
      </div>
    </div>
  );
};
