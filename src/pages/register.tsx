// src/pages/register.tsx

import GeneralPadding from "../layouts/GeneralPadding";
import Double from "../layouts/Double";
import HeroImage from "../components/Home/Landing/HeroImage";
import RegisterCard from "../components/Auth/RegisterCard";

const Register = () => {
  return (
    <GeneralPadding>
      <Double left={<RegisterCard />} right={<HeroImage imageSrc="/images/img-register.png"/>} />
    </GeneralPadding>
  );
};

export default Register;
