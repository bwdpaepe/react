import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as userApi from '../api/users';
import * as api from '../api';
import config from '../config.json';

const JWT_TOKEN_KEY = config.token_key;
const AuthContext = createContext();

function parseJWT(token) {
  if (!token) return {};
  const base64url = token.split('.')[1];
  const payload = Buffer.from(base64url, 'base64');
  const jsonPayload = payload.toString('ascii');
  return JSON.parse(jsonPayload);
}

function parseExp(exp) {
  if (!exp) return null;
  if (typeof exp !== 'number') exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
}

const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const { loading, error, token, user, ready, hasRole } = useAuth();
  return { loading, error, token, user, ready, isAuthed: Boolean(token), hasRole };
}

export const useLogin = () => {
  const { login } = useAuth();
  return login;
}
export const useRegister = () => {
  const { register } = useAuth();
  return register;
}


export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
}

export const AuthProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);

  const setSession = useCallback(async (token, user) => {
    const { exp, userId } = parseJWT(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (stillValid) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    }
    else {
      setError("Session expired, please login again")
      localStorage.removeItem(JWT_TOKEN_KEY);
      token = null;
    }
    api.setAuthToken(token);
    setReady(stillValid);
    setToken(token);
    if (!user && stillValid) {
      user = await userApi.getById(userId);
    }
    setUser(user);
  }, []);

  useEffect(() => {
    setSession(token, null);// we kennen de gebruiker niet
  }, [token, setSession]);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError('');
      const { token, user } = await userApi.login(email, password);
      setSession(token, user);
      //setUser(user);
      return true;
    } catch (error) {
      console.error(error);
      setError('Login failed, try again');
      return false;
    }
    finally {
      setLoading(false);
    }
  }, [setSession]);

  const register = useCallback(async ({ name, email, password }) => {
    try {
      setLoading(true);
      setError('');
      const { token, user } = await userApi.register({ name, email, password });
      setSession(token, user);
      //setUser(user);
      return true;
    } catch (error) {
      console.error(error);
      setError('Registration failed, try again');
      return false;
    }
    finally {
      setLoading(false);
    }
  }, [setSession]);

  const logout = useCallback(() => {
    setSession(null, null);
    //setUser(null);
  }, [setSession]);

  const hasRole = useCallback((role) => {
    if (!user) return false;
    return user.roles.includes(role);
  }, [user]);

  const value = useMemo(() => ({
    loading,
    error,
    token,
    user,
    ready,
    login,
    register,
    logout,
    hasRole
  }), [loading, error, token, user, ready, login, register, logout, hasRole]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};
