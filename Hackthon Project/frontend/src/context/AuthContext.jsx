import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProfile, loginRequest, registerRequest } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('smartfarm_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('smartfarm_token'));
  const [initializing, setInitializing] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setInitializing(false);
        return;
      }
      try {
        const profile = await fetchProfile();
        setUser(profile.data);
        localStorage.setItem('smartfarm_user', JSON.stringify(profile.data));
      } catch (err) {
        logout();
      } finally {
        setInitializing(false);
      }
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistAuth = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem('smartfarm_user', JSON.stringify(payload.user));
    localStorage.setItem('smartfarm_token', payload.token);
  };

  const login = async (credentials) => {
    setAuthLoading(true);
    setError(null);
    try {
      const response = await loginRequest(credentials);
      persistAuth(response.data);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (payload) => {
    setAuthLoading(true);
    setError(null);
    try {
      const response = await registerRequest(payload);
      persistAuth(response.data);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('smartfarm_user');
    localStorage.removeItem('smartfarm_token');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      authLoading,
      initializing,
      error,
      setError,
    }),
    [user, token, authLoading, initializing, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


