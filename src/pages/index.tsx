// src/pages/index.tsx

import { useState, useEffect } from "react";
import GeneralPadding from "../layouts/GeneralPadding";
import Loader from "../components/Home/Loader";
import Double from "../layouts/Double";
import WelcomeCard from "../components/Home/Landing/WelcomeCard";
import HeroImage from "../components/Home/Landing/HeroImage";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GeneralPadding>
      <div
        className={`fixed z-20 inset-0 flex items-center justify-center bg-white transition-opacity duration-500 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-10`}
      >
        <Loader />
      </div>

      <Double left={<WelcomeCard />} right={<HeroImage imageSrc="/images/img-landing.png"/>} />
    </GeneralPadding>
  );
};

export default Home;
