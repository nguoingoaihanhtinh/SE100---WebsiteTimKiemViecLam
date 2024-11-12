import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout';
import HomePage from '../pages/HomePage/HomePage';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='*' element={<UserLayout/>}>
                <Route index element={<HomePage />} />
            </Route>
        </Route>
));
export default Router