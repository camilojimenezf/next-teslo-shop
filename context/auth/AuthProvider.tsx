import { FC, ReactNode, useReducer, useEffect } from 'react';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import Cookie from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

interface Props {
  children: ReactNode
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, [])

  const checkToken = async () => {
    if (!Cookie.get('token')) {
      return;
    }
    try {
      const { data } = await tesloApi.get('/user/validate-token');
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
    } catch (err) {
      Cookie.remove('token');
    }
  }

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (err) {
      return false;
    }
  }

  const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false,
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return {
          hasError: true,
          message: err.response?.data.message,
        }
      }
      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo'
      }
    }
  }

  const logout = () => {
    Cookie.remove('token');
    Cookie.remove('cart');
    router.reload();
  }

  return (
    <AuthContext.Provider value={{
      ...state,

      loginUser,
      registerUser,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
