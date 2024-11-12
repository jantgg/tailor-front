// src/components/UI/Navbar.tsx
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Arrow from "./Arrow";
import Button from "./Button";
import LogoName from "./LogoName";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Navbar: FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar si el componente está montado
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    setDropdownOpen(false); // Cerrar el dropdown después de cerrar sesión
    console.log("Cerrando sesión y redirigiendo a la raíz...");
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  if (!isMounted) return null;

  return (
    <nav className="fixed z-30 w-full p-4 px-6 flex justify-between items-center">
      {/* Logo o Nombre de la Aplicación */}
      <Link href="/main">
        <LogoName />
      </Link>

      {/* Menú de Usuario */}
      <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="text-xl capitalize">{user?.username}</span>
          <Arrow
            direction={dropdownOpen ? "down" : "up"}
            color="black"
            className="h-5 w-5"
          />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute z-20 right-0 mt-2 w-48 bg-tailor-blue text-white rounded-lg shadow-lg">
            <ul className="p-2">
              <li className="py-1 px-2 hover:bg-blue-600 rounded">
                <Link href="/panel" onClick={closeDropdown}>
                  Panel de control
                </Link>
              </li>
              <li className="py-1 px-2 hover:bg-blue-600 rounded">
                <Link href="/restaurants/create" onClick={closeDropdown}>
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
