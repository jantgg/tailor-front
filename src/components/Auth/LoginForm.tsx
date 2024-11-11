import React, { useState } from 'react';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { loginUser } from '../../redux/slices/authSlice';
import Input from '../UI/Input';
import InputPassword from '../UI/InputPassword';
import Button from '../UI/Button';
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const router = useRouter();

  // Obtener el estado de error y loading desde Redux
  const { error: serverError, loading } = useSelector((state: RootState) => state.auth);

  const loginSchema = z.object({
    username: z.string().nonempty("El nombre de usuario es requerido"),
    password: z.string().nonempty("La contraseña es requerida"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      setErrors({});
      
      // Realizar el login
      const response = await dispatch(loginUser({ username: formData.username, password: formData.password }));
      
      if (response.meta.requestStatus === 'fulfilled') {
        router.push("/main");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 w-full gap-y-4">
      <Input
        label="Nombre de usuario"
        placeholder="Escribe tu nombre de usuario"
        value={formData.username}
        onChange={handleChange}
        name="username"
        additionalClasses="text-white"
      />
      {errors.username && <p className="text-red-500">{errors.username}</p>}

      <InputPassword
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        value={formData.password}
        onChange={handleChange}
        name="password"
        additionalClasses="text-white"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      {serverError && serverError.message && (
        <p className="text-red-500 mt-4">
          {JSON.parse(serverError.message)?.error || 'Error desconocido'}
        </p>
      )}
      
      <Button
        text="Entrar"
        additionalClasses="text-white rounded-3xl px-10 py-4 mt-6 md:mt-10 max-w-[200px]"
        loading={loading}
      />
    </form>
  );
};

export default LoginForm;
