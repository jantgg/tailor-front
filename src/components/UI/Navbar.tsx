// src/components/UI/Navbar.tsx
import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import Arrow from './Arrow';
import Button from './Button';
import LogoName from './LogoName';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store'; 
import { logout } from '../../redux/slices/authSlice';

const Navbar: FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar si el componente está montado
  const [userName, setUserName] = useState<string | null>(null); // Estado para el nombre de usuario

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Establece que el componente está montado en el cliente
    // Aquí podrías cargar el nombre de usuario desde el estado de Redux o localStorage si es necesario
    const storedUserName = "Nombre usuario"; // Aquí puedes obtener el nombre real del usuario desde el estado global o localStorage
    setUserName(storedUserName);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
    console.log('Cerrando sesión y redirigiendo a la raíz...');
  };

  if (!isMounted) return null; // Evita el renderizado en el servidor

  return (
    <nav className="fixed z-30 w-full p-4 px-6 flex justify-between items-center">
     
      {/* Logo o Nombre de la Aplicación */}
      <LogoName />

      {/* Menú de Usuario */}
      <div className="relative">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
          <span className="text-xl">{userName}</span>
          <Arrow direction={dropdownOpen ? 'down' : 'up'} color="black" className='h-5 w-5'/>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute z-20 right-0 mt-2 w-48 bg-tailor-blue text-white rounded-lg shadow-lg">
            <ul className="p-2">
              <li className="py-1 px-2 hover:bg-blue-600 rounded">
                <Link href="/panel">
                  Panel de control
                </Link>
              </li>
              <li className="py-1 px-2 hover:bg-blue-600 rounded">
                <Link href="/add-restaurant">
                  Añadir restaurante
                </Link>
              </li>
              <hr className="my-2 border-gray-300" />
              <li className="py-1 px-2 flex justify-center">
                <Button 
                  text="Cerrar sesión" 
                  onClick={handleLogout} 
                  additionalClasses="border-white text-white hover:bg-white hover:text-tailor-blue rounded-xl"
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
