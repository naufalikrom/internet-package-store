import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { LoginPage } from './pages/LoginPage.tsx';
import { TransactionsPage } from './pages/TransactionsPage.tsx';
import { Toaster } from 'sonner';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/transactions",
    element: <TransactionsPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(


  <React.StrictMode>
    <Toaster position='top-right' />
    <RouterProvider router={router} />
  </React.StrictMode>,
);