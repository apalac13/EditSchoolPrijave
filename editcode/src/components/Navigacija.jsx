import { useContext } from "react";
import { NavLink } from "react-router-dom";
import userContext from "./userContext";

function Navigacija({ action }) {
  const user = useContext(userContext);

  const items = [
    { link: "/", value: "RADIONICE" },
    { link: "/predavaci", value: "PREDAVACI" },
    { link: "/administracija", value: "ADMINISTRACIJA" },
  ];

  return (
    <nav className=" w-full flex justify-between px-10 py-10 font-inter text-2xl  border bottom-1 border-blue-45  text-gold-50  ">
      <div className=" w-full flex items-center justify-between">
        <ul className=" flex gap-[30px]   ">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className="p-1 text-gold-50 hover:border-b-2 border-gold-50/60 hover:text-gold-50/60"
              >
                {item.value}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-[14px] hover:text-gold-50/60">
          <label htmlFor="admin" className=" cursor-pointer  ">
            ADMIN
          </label>
          <input
            id="admin"
            alt="admin checckbox"
            type="checkbox"
            value={user}
            checked={user}
            onChange={action}
            className="w-8 h-8 border border-solid border-blue-46 rounded-xl checked:bg-blue-46 mr-2 cursor-pointer hover:text-black-61/60"
          />
        </ul>
      </div>
    </nav>
  );
}

export default Navigacija;
