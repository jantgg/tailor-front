import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import StarRating from "../UI/StarRating";
import TextField from "../UI/TextField";
import Button from "../UI/Button";

interface ReviewItemProps {
  review: {
    id: string;
    name: string;
    rating: number;
    comments: string;
    user: {
      id: string;
      username: string;
    };
  };
  onEdit: (reviewId: string, updatedData: { rating: number; comments: string }) => void;
  onDelete: (reviewId: string) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onEdit, onDelete }) => {
  const loggedInUserId = useSelector((state: RootState) => state.auth.user?.id);
  const isUserReview = review.user.id === loggedInUserId;

  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [editedComment, setEditedComment] = useState(review.comments);

  const handleSave = () => {
    onEdit(review.id, { rating: editedRating, comments: editedComment });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRating(review.rating);
    setEditedComment(review.comments);
    setIsEditing(false);
  };

  return (
    <div className="border-b border-gray-300 py-4 grid grid-cols-1 gap-x-4 px-4">
      <div className="flex justify-center items-center min-w-[200px] text-wrap">
        <p className="w-full font-bold capitalize text-3xl">{review.name}</p>
        {!isEditing ? (
          <StarRating rating={review.rating} selectable={false} />
        ) : (
          <StarRating rating={editedRating} selectable={true} onChange={setEditedRating} />
        )}
      </div>
      
      {!isEditing ? (
        <p className="text-gray-700 mt-2">{review.comments}</p>
      ) : (
        <TextField
          label=""
          placeholder="Edita tu comentario"
          value={editedComment}
          onChange={setEditedComment}
        />
      )}

      {isUserReview && (
        <div className="flex justify-end space-x-4 mt-2">
          {isEditing ? (
            <>
              <Button text="Guardar" onClick={handleSave} additionalClasses="rounded-xl" />
              <Button text="Cancelar" onClick={handleCancel} additionalClasses="rounded-xl" />
            </>
          ) : (
            <>
              <Button text="Editar" onClick={() => setIsEditing(true)} additionalClasses="rounded-xl" />
              <Button text="Eliminar" onClick={() => onDelete(review.id)} additionalClasses="rounded-xl" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
