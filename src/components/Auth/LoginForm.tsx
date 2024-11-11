import React, { useState } from 'react';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/authSlice';
import Input from '../UI/Input';  // Importar el componente Input normal
import InputPassword from '../UI/InputPassword';  // Importar el componente InputPassword
import Button from '../UI/Button';
import { RootState } from '../../redux/store';
import { useRouter } from "next/router"; // Importar useRouter

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ username: '', password: '' }); // Cambiar 'email' por 'username'
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({}); // Actualizar 'email' por 'username'
  const router = useRouter(); // Inicializar useRouter para navegación

  // Accedemos al error global desde Redux
  const serverError = useSelector((state: RootState) => state.auth.error);

  const loginSchema = z.object({
    username: z.string().nonempty("El nombre de usuario es requerido"), // Cambiar 'email' por 'username'
    password: z.string().nonempty("La contraseña es requerida"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    try {
      // Validación con Zod
      loginSchema.parse(formData);
      console.log('Form data is valid:', formData);
      setErrors({}); // Limpiar errores de validación previos

      // Lanzar la acción de login
      const response = await dispatch(loginUser({ username: formData.username, password: formData.password }));
      console.log('Login request dispatched');

      // Comprobar si el login fue exitoso
      if (response.meta.requestStatus === 'fulfilled') {
        router.push("/main"); // Redirigir a la página principal en caso de login exitoso
      }
    } catch (error) {
      console.log('Error caught in handleSubmit');
      if (error instanceof z.ZodError) {
        console.log('Zod validation error:', error.flatten().fieldErrors);
        setErrors(error.flatten().fieldErrors);
      } else if (error instanceof Error) {
        console.log('Server error:', error.message);
      } else {
        console.log('Unknown error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 w-full gap-y-4">
      <Input
        label="Nombre de usuario" // Cambiar "Email" por "Nombre de usuario"
        placeholder="Escribe tu nombre de usuario" // Cambiar el placeholder a 'nombre de usuario'
        value={formData.username}
        onChange={handleChange}
        name="username"
        additionalClasses="text-white"
      />
      {errors.username && <p className="text-red-500">{errors.username}</p>}

      {/* Usar InputPassword en lugar de Input para la contraseña */}
      <InputPassword
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        value={formData.password}
        onChange={handleChange}
        name="password"
        additionalClasses="text-white"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      {/* Mostrar mensaje de error del servidor si existe */}
      {serverError && serverError.message && (
        <p className="text-red-500 mt-4">
          {/* Deserializamos el JSON de 'serverError.message' y mostramos solo el mensaje */}
          {JSON.parse(serverError.message)?.error || 'Error desconocido'}
        </p>
      )}
      
      <Button
        text="Entrar"
        additionalClasses="text-white rounded-3xl px-10 py-4 mt-6 md:mt-10 max-w-[200px]"
      />
    </form>
  );
};

export default LoginForm;
