import { FC, useState } from 'react';
import Link from 'next/link';
import Arrow from './Arrow';
import Button from './Button';

const Navbar: FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Aquí puedes añadir la lógica para cerrar sesión, como llamar a una API o limpiar el estado
    console.log('Cerrando sesión...');
  };

  return (
    <nav className="w-full bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Nombre de la Aplicación */}
        <div className="text-xl font-bold">
          <Link href="/">
            <a>Mi Aplicación</a>
          </Link>
        </div>

        {/* Menú de Usuario */}
        <div className="relative">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
            <span className="text-sm font-medium">Nombre usuario</span>
            <Arrow direction={dropdownOpen ? 'up' : 'down'} />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-blue-500 text-white rounded-lg shadow-lg">
              <ul className="p-2">
                <li className="py-1 px-2 hover:bg-blue-600 rounded">
                  <Link href="/panel">
                    <a>Panel de control</a>
                  </Link>
                </li>
                <li className="py-1 px-2 hover:bg-blue-600 rounded">
                  <Link href="/add-restaurant">
                    <a>Añadir restaurante</a>
                  </Link>
                </li>
                <hr className="my-2 border-gray-300" />
                <li className="py-1 px-2 flex justify-center">
                  <Button 
                    text="Cerrar sesión" 
                    onClick={handleLogout} 
                    additionalClasses="border-white text-white hover:bg-white hover:text-blue-500"
                  />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
