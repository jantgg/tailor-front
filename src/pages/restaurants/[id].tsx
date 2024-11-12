// pages/restaurants/[id].tsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchRestaurant } from "../../redux/slices/restaurantsSlice";
import Spinner from "../../components/UI/Spinner";
import ReviewList from "../../components/Reviews/ReviewList";
import PostReview from "../../components/Reviews/PostReview";
import GeneralPadding from "../../layouts/GeneralPadding";

const RestaurantDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;

  const { singleRestaurant, loading } = useSelector(
    (state: RootState) => state.restaurants
  );
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (id && typeof id === "string" && token) {
      dispatch(fetchRestaurant({ id, token }));
    }
  }, [id, token, dispatch]);

  if (loading) return <Spinner size="w-12 h-12" />;
  if (!singleRestaurant) return <p>No se encontró el restaurante.</p>;

  return (
    <GeneralPadding overflow="auto">
      <div className="grid grid-cols-1 pt-12">
        <div className="relative min-h-[350px] h-[40vhe]">
          <img
            src={singleRestaurant.image}
            alt={singleRestaurant.name}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white">
            <h1 className="text-3xl font-semibold">{singleRestaurant.name}</h1>
            <p className="text-gray-200">{singleRestaurant.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 px-0 md:px-40 mt-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <p className="grow min-w-[300px]">
              Lorem ipsum dolor sit amet consectetur. At vel elementum amet est
              nulla cras turpis. Fringilla ornare massa eu a sollicitudin
              vestibulum auctor risus. Elementum quam sit neque quis. A
              vestibulum consectetur tincidunt vitae.Lorem ipsum dolor sit amet
              consectetur. At vel elementum amet est nulla cras turpis.
              Fringilla ornare massa eu a sollicitudin vestibulum auctor risus.
              Elementum quam sit neque quis. A vestibulum consectetur tincidunt
              vitae.Lorem ipsum dolor sit amet consectetur. At vel elementum
              amet est nulla cras turpis. Fringilla ornare massa eu a
              sollicitudin vestibulum auctor risus. Elementum quam sit neque
              quis. A vestibulum consectetur tincidunt vitae.
            </p>

            <PostReview restaurantId={singleRestaurant.id} className="min-w-[300px]" />
          </div>

          <ReviewList reviews={singleRestaurant.reviews} restaurantId={singleRestaurant.id} />
        </div>
      </div>
    </GeneralPadding>
  );
};

export default RestaurantDetail;
