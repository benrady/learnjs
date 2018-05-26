import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LandingRoutes from './LandingRoutes';

const LandingRouter = () => {
    return (
        <BrowserRouter>
            <LandingRoutes />
        </BrowserRouter>
    )
}

export default LandingRouter;