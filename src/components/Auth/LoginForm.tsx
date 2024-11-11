import React, { useState } from 'react';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/authSlice';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { RootState } from '../../redux/store';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Tipado específico
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  // Accedemos al error global desde Redux
  const serverError = useSelector((state: RootState) => state.auth.error);

  const loginSchema = z.object({
    email: z.string().nonempty("El email es requerido"),
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
      // No es necesario limpiar serverError porque ya viene del estado global de Redux
      await dispatch(loginUser({ username: formData.email, password: formData.password }));

      console.log('Login request dispatched');
    } catch (error) {
      console.log('Error caught in handleSubmit');
      
      if (error instanceof z.ZodError) {
        console.log('Zod validation error:', error.flatten().fieldErrors);
        setErrors(error.flatten().fieldErrors); // Errores de validación
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
        label="Email"
        placeholder="Escribe tu email"
        value={formData.email}
        onChange={handleChange}
        name="email"
        additionalClasses="text-white"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <Input
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        value={formData.password}
        onChange={handleChange}
        name="password"
        additionalClasses="text-white"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      {/* Mostrar mensaje de error del servidor si existe */}
      {serverError && (
        <p className="text-red-500 mt-4">
          {serverError.error} {/* Accediendo a la propiedad 'error' y mostrando solo el mensaje */}
        </p>
      )}


      <Button text="Entrar" additionalClasses="text-white rounded-3xl px-10 py-4 mt-10 max-w-[200px]" />
    </form>
  );
};

export default LoginForm;
