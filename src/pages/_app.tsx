// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from '../redux/store';
import Navbar from '../components/UI/Navbar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setTokenFromStorage } from '../redux/slices/authSlice';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </Provider>
  );
};

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  // Cargar el token desde el almacenamiento local al inicio
  useEffect(() => {
    dispatch(setTokenFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const publicRoutes = ['/', '/login', '/register']; // Páginas públicas
    const isPublicRoute = publicRoutes.includes(router.pathname);

    if (token && isPublicRoute) {
      // Si el usuario tiene un token y está en una página pública, redirigir a /main
      router.push('/main');
    } else if (!token && !isPublicRoute) {
      // Si el usuario no tiene un token y está en una página privada, redirigir a /login
      router.push('/login');
    }
  }, [token, router]);

  return (
    <>
      {token && <Navbar />}
      {children}
    </>
  );
};

export default MyApp;
