import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import './global.css';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes />
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
      <Footer />
    </AuthProvider>
  )
}

export default App