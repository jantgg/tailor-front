// RestaurantForm.tsx

import React, { useState } from 'react';
import { z } from 'zod';
import Input from '../UI/Input';
import Button from '../UI/Button';
import TextArea from '../UI/TextArea';
import ImageUploader from './ImageUploader';
import RestaurantSuccess from './REstaurantSuccess';
import RestaurantError from './RestaurantError';
import { createRestaurant } from '../../redux/slices/restaurantsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const restaurantSchema = z.object({
  name: z.string().nonempty("El nombre del restaurante es requerido"),
  address: z.string().nonempty("La dirección del restaurante es requerida"),
  image: z.string().url("Debe ser una URL válida").optional(),
});


const RestaurantForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState<{ name?: string; address?: string; description?: string; imageUrl?: string }>({});
  const token = useSelector((state: RootState) => state.auth.token);
  const formStatus = useSelector((state: RootState) => state.restaurants.formStatus);


  // Estado local para la URL temporal de la imagen antes de guardar
  const [tempImageUrl, setTempImageUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUrlChange = (url: string) => {
    setTempImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      address: formData.address,
      image: tempImageUrl,
    };
  
    try {
      restaurantSchema.parse(dataToSend);
      setErrors({});
      console.log('Datos enviados:', dataToSend);
  
      if (!token) {
        console.error("Token no disponible, el usuario debe estar autenticado.");
        return;
      }
  
      dispatch(createRestaurant({ restaurantData: dataToSend, token }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    }
  };
  
  

  if (formStatus === 'success') {
    return <RestaurantSuccess />;
  }

  if (formStatus === 'error') {
    return <RestaurantError />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col items-center">
        <ImageUploader onImageUrlChange={handleImageUrlChange} />
        {errors.imageUrl && <p className="text-red-500">{errors.imageUrl}</p>}
      </div>
      
      <div className="flex flex-col space-y-4">
        <Input
          label="Nombre de restaurante"
          placeholder="Nombre del restaurante"
          value={formData.name}
          onChange={handleChange}
          name="name"
          additionalClasses="text-black border-black text-3xl"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <Input
          label="Dirección del restaurante"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          name="address"
          additionalClasses="text-black border-black text-3xl"
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}

        <TextArea
          label="Descripción del restaurante"
          placeholder="Escribe información acerca del restaurante"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          className=""
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}

        <Button text="Guardar" additionalClasses="rounded-xl max-w-[150px] text-xl" />
      </div>
    </form>
  );
};

export default RestaurantForm;
