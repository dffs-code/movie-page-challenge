import React from 'react';
import Header from './components/header';
import Index from './pages/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

function App() {
  return (
    <>
      <Header />
      <Index />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App