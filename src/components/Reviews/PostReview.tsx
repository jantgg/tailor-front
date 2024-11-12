import { useState } from "react";
import StarRating from "../UI/StarRating";
import TextField from "../UI/TextField";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createReview } from "../../redux/slices/reviewsSlice";
import { z } from "zod";
import { fetchRestaurant } from "../../redux/slices/restaurantsSlice";

interface PostReviewProps {
  restaurantId: string;
  className?: string;
}

const PostReview: React.FC<PostReviewProps> = ({ className, restaurantId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState<{ comment?: string; rating?: string }>({});
  
    const reviewSchema = z.object({
      rating: z.number().min(1, "La calificación es requerida"),
      comment: z.string().nonempty("El comentario es requerido"),
    });
  
    const handleSubmit = async () => {
      try {
        if (!user) {
          setErrors({ comment: "Debe iniciar sesión para dejar una reseña." });
          return;
        }
        if (!token) {
          setErrors({ comment: "Token inválido. Por favor, inicie sesión de nuevo." });
          return;
        }
        reviewSchema.parse({ rating, comment });
        setErrors({});
        await dispatch(createReview({
          reviewData: { 
            rating, 
            comments: comment, 
            userId: user.id, 
            restaurantId: restaurantId,
            name: user.username,
          }, 
          token: token
        }));
  
        // Fetch para actualizar la información del restaurante
        dispatch(fetchRestaurant({ id: restaurantId, token }));
  
        // Resetea el estado
        setRating(0);
        setComment("");
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(error.flatten().fieldErrors);
        }
      }
    };

  return (
    <div className={`border rounded-xl p-4 ${className || ""}`}>
      <StarRating
        rating={rating}
        maxRating={5}
        selectable
        onChange={setRating}
      />
      {errors.rating && <p className="text-red-500">{errors.rating}</p>}
      
      <TextField
        label=""
        placeholder="Escribe tu comentario sobre el restaurante"
        value={comment}
        onChange={setComment}
      />
      {errors.comment && <p className="text-red-500">{errors.comment}</p>}
      
      <Button
        onClick={handleSubmit}
        additionalClasses="text-black rounded-md hover:bg-tailor-blue hover:text-white transition-colors"
      >
        Enviar
      </Button>
    </div>
  );
};

export default PostReview;
