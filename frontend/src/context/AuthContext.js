import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const validateToken = useCallback(async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.valid) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    }
  }, [validateToken]);

  const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/login', { 
            email, 
            password 
        });

        const { token, user } = response.data;
        // Armazena o token com 'Bearer '
        localStorage.setItem('token', `Bearer ${token}`);
        setUser(user);
        setIsAuthenticated(true);
        navigate('/');

        return { success: true, user };
    } catch (error) {
        console.error('Erro no login:', error);
        return { 
            success: false, 
            error: error.response?.data?.error || 'Erro ao realizar login' 
        };
    }
};

  const register = async (email, password, data_nasc) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        email,
        password,
        data_nasc
      });

      return { success: true };
      
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Registro falhou'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        logout,
        validateToken,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
