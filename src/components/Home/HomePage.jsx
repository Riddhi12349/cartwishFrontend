import React from "react";
import HeroSection from "./HeroSection.jsx";
import FeaturedProducts from "./FeaturedProducts";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="/product/6548ababef30a96352aef931"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and color-matched Magic accessories to your bag after configuring your Mac mini"
        link="/product/6548ababef30a96352aef939"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
