import React from "react";
import Navber from "../../Components/Navber";
import Hero from "../../Components/Hero";
import AboutMe from "../../Components/AboutMe";
import Works from "../../Components/Works";
import Book from "../../Components/Book";
import Contebuters from "../../Components/Contebuters";
import HowWorks from "../../Components/HowWorks";

const Home = () => {
  return (
    <div>
      <div>
        <Hero />
        <AboutMe />
        <Works />
        <Book />
        <Contebuters />
        <HowWorks/>
      </div>
    </div>
  );
};

export default Home;
