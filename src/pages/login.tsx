// src/pages/login.tsx

import GeneralPadding from "../layouts/GeneralPadding";
import Double from "../layouts/Double";
import AuthCard from "../components/Auth/AuthCard";
import HeroImage from "../components/Home/Landing/HeroImage";

const Login = () => {
  return (
    <GeneralPadding>
      <Double left={<AuthCard />} right={<HeroImage imageSrc="/images/img-login.png"/>} />
    </GeneralPadding>
  );
};

export default Login;
