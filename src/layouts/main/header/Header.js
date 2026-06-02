import React from "react";
import siteConfig from "../../../config/siteConfig";
import Navbar from "../../main/header/Navbar";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/100 shadow-md py-3 px-3 md:px-20 flex justify-between items-center z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <a href={siteConfig.logos.homeUrl}>
          <img 
          src={siteConfig.logos.main} 
          alt={siteConfig.logos.name} 
          className="h-12 animate-logoAni" />
        </a>
        <a href="/">
          <img 
          src={siteConfig.logos.text} 
          alt={siteConfig.logos.name}
          className="h-12" />
        </a>
      </div>

      {/* Navbar */}
      <Navbar />
    </header>
  );
};

export default Header;
