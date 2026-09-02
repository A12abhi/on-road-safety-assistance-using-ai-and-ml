import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('onroad_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/users/profile');
        setUser(data.user);
      } catch {
        localStorage.removeItem('onroad_token');
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    localStorage.setItem('onroad_token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('onroad_token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('onroad_token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, setUser, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
