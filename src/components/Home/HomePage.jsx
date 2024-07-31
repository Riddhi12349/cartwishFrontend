import React from "react";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";

import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of the Latest iPhone 14 Pro "
        link="/product/6685031e46936dffc1cd9ab0"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="Experience the power of the the environment of an iPhone products  "
        link="/product/6685031e46936dffc1cd9ab8"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
