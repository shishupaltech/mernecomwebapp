import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logoremove.png";

import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

const Header = () => {
  return (
    <ReactNavbar
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      logoRadius="50%"
      navColor1="blue"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/product"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="white"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIconColor="white"
      searchIconColor="white"
      cartIconColor="white"
      profileIconColorHover="#eb4035"
      searchIconColorHover="#eb4035"
      cartIconColorHover="#eb4035"
      cartIconMargin="1vmax"
      profileIcon={true}
      ProfileIconElement={MdAccountCircle}
      searchIcon={true}
      SearchIconElement={MdSearch}
      cartIcon={true}
      cartIconColon={"rgba(35, 35, 35,0.8)"}
      CartIconElement={MdAddShoppingCart}
    />
  );
};

export default Header;
