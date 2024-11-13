import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout';
import HomePage from '../pages/HomePage/HomePage';
import JobListPage from '../pages/JobListPage/JobListPage';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='*' element={<UserLayout/>}>
                <Route index element={<HomePage />} />
                <Route path='category' element={<JobListPage />} />
            </Route>
        </Route>
));
export default Router