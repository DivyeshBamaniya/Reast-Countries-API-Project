import { StrictMode } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './components/Home.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import CountryDetail from './components/CountryDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:country",
        element: <CountryDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
