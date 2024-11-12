import React, { useState } from "react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { registerUser } from "../../redux/slices/authSlice";
import Input from "../UI/Input";
import InputPassword from "../UI/InputPassword";
import Button from "../UI/Button";
import { useRouter } from "next/router";
import Arrow from "../UI/Arrow";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string[];
    username?: string[];
    password?: string[];
  }>({});

  const stepOneSchema = z.object({
    email: z
      .string()
      .nonempty("El email es requerido")
      .email("Por favor, ingresa un email válido"),
    username: z
      .string()
      .nonempty("El nombre de usuario es requerido")
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .regex(/^[a-zA-Z0-9_]+$/, "El nombre de usuario solo puede contener letras, números y guiones bajos"),
  });

  const stepTwoSchema = z.object({
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .regex(/[0-9]/, "La contraseña debe tener al menos un número")
      .regex(/[\W_]/, "La contraseña debe tener al menos un carácter especial (por ejemplo, @, $, etc.)"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      stepOneSchema.parse(formData);
      setErrors({});
      setStep(2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    }
  };

  const handleSubmitStepTwo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      stepTwoSchema.parse(formData);
      setErrors({});
      const response = await dispatch(registerUser(formData)); 
      if (response.meta.requestStatus === 'fulfilled') {
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <form className="grid grid-cols-1 w-full gap-y-4">
      {step === 1 && (
        <>
          <Input
            label="Email"
            placeholder="Añade tu email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            additionalClasses="text-white"
          />
          {errors.email && (
            <ul className="text-red-500">
              {errors.email.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <Input
            label="Nombre de usuario"
            placeholder="Añade tu nombre"
            value={formData.username}
            onChange={handleChange}
            name="username"
            additionalClasses="text-white"
          />
          {errors.username && (
            <ul className="text-red-500">
              {errors.username.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <div className="flex justify-between">
            <Button
              text="←"
              href="/login"
              additionalClasses="text-white rounded-3xl px-10 py-4 mt-4 md:mt-6 max-w-[200px]"
            >
              <Arrow direction="left" />
            </Button>
            <Button
              text="Siguiente"
              onClick={handleSubmitStepOne}
              additionalClasses="text-white rounded-3xl px-10 py-4 mt-4 md:mt-6 max-w-[200px]"
            />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <InputPassword
            label="Crea una contraseña nueva"
            placeholder="Añade una contraseña"
            value={formData.password}
            onChange={handleChange}
            name="password"
            additionalClasses="text-white"
          />
          {errors.password && (
            <ul className="text-red-500">
              {errors.password.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <div className="flex justify-between">
            <Button
              text="←"
              onClick={() => setStep(1)}
              additionalClasses="text-white rounded-3xl px-10 py-4 mt-4 md:mt-6 max-w-[200px]"
            />
            <Button
              text="Finalizar"
              onClick={handleSubmitStepTwo}
              additionalClasses="text-white rounded-3xl px-10 py-4 mt-4 md:mt-6 max-w-[200px]"
              loading={loading}
            />
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
