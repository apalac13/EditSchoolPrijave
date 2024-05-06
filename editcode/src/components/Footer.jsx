import logo from "/slike/logo-footer.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Footer(props) {
  const items = [
    { link: "/", value: "RADIONICE" },
    { link: "/predavaci", value: "PREDAVACI" },
    { link: "/administracija", value: "ADMINISTRACIJA" },
  ];

  return (
    <div className="w-full flex flex-col justify-center h-[300px] bg-blue-45 px-40">
      <div className="flex items-center justify-between  pb-4 ">
        <img src={logo} alt="logo" className=" w-56" />
        <div className="flex flex-col gap-2 ">
          <p className="p-1 text-4xl text-gold-50  border-gold-50/60 hover:text-gold-50/60">
            MENU
          </p>
          <nav className="flex items-center justify-between">
            <ul className="flex flex-col">
              {items.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    className=" text-gold-50  border-gold-50/60 hover:text-gold-50/60"
                  >
                    {item.value}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Footer;
