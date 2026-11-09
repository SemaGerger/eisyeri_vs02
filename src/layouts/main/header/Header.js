import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "../../../config/siteConfig";
import Navbar from "./Navbar";

const Header = () => (
  <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between gap-2 bg-white px-3 py-3 shadow-md sm:gap-4 sm:px-6 xl:px-8 2xl:px-12">
    <Link
      to={siteConfig.logos.homeUrl}
      aria-label={siteConfig.logos.name}
      className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      <img src={siteConfig.logos.main} alt="" className="h-10 w-auto sm:h-12" />
      <img src={siteConfig.logos.text} alt="" className="h-10 w-auto sm:h-12" />
    </Link>
    <Navbar />
  </header>
);

export default Header;
