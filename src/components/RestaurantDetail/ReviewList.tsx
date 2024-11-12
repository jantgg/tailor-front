import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewItem from "./ReviewItem";
import { deleteReview, updateReview } from "../../redux/slices/reviewsSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchRestaurant } from "../../redux/slices/restaurantsSlice";

interface ReviewListProps {
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    comments: string;
    user: {
      id: string;
      username: string;
    };
  }>;
  restaurantId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, restaurantId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleEditReview = async (reviewId: string, updatedData: { rating: number; comments: string }) => {
    if (token) {
      try {
        await dispatch(updateReview({ reviewId, token, updatedData }));
        await dispatch(fetchRestaurant({ id: restaurantId, token }));
      } catch (error) {
        console.error("Error al actualizar la reseña o al recargar el restaurante:", error);
      }
    } else {
      console.error("Token no disponible para realizar la acción.");
    }
  };
  
  const handleDeleteReview = async (reviewId: string) => {
    if (token) {
      try {
        await dispatch(deleteReview({ reviewId, token }));
        await dispatch(fetchRestaurant({ id: restaurantId, token }));
      } catch (error) {
        console.error("Error al eliminar la reseña o al recargar el restaurante:", error);
      }
    } else {
      console.error("Token no disponible para realizar la acción.");
    }
  };
  

  return (
    <div className="mt-8">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onEdit={(reviewId, updatedData) => handleEditReview(reviewId, updatedData)}
          onDelete={handleDeleteReview}
        />
      ))}
    </div>
  );
};

export default ReviewList;
