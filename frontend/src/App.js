import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductManagement from './components/ProductManagement';
import ShoppingCart from './components/ShoppingCart';
import PaymentCheckout from './components/PaymentCheckout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Product from './components/Product';
import Fornecedores from './components/Fornecedores';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Product /> : <Navigate to="/login" />}
          />
          <Route
            path="/manage"
            element={isAuthenticated ? <ProductManagement /> : <Navigate to="/login" />}
          />
          <Route 
            path="/cart" 
            element={isAuthenticated ? <ShoppingCart /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/checkout" 
            element={isAuthenticated ? <PaymentCheckout /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/fornecedores" 
            element={isAuthenticated ? <Fornecedores /> : <Navigate to="/login" />} 
          />
          {/* Rotas públicas */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />} 
          />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
