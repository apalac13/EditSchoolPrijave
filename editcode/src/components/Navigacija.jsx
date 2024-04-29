import { useContext } from "react";
import { NavLink } from "react-router-dom";

function Navigacija({ action }) {
  const user = useContext(useContext);

  return (
    <nav className=" w-full flex justify-between  px-10 py-10  border-b-2 border-black-45 font-pt-sans-narrow  text-2xl text-black-45  ">
      <div className=" w-full flex items-center justify-between">
        <ul className=" flex gap-[30px]   ">
          <li>
            <NavLink
              to={"/"}
              className=" text-black-45 hover:border-b-2 border-black-45/60 hover:text-black-45/60"
            >
              RADIONICE
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/predavaci"}
              className="text-black-45 hover:border-b-2 border-black-45/60 hover:text-black-45/60"
            >
              PREDAVACI
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/administracija"}
              className="text-black-45 hover:border-b-2 border-black-45/60 hover:text-black-45/60"
            >
              ADMINISTRACIJA
            </NavLink>
          </li>
        </ul>
        <ul className=" hidden md:flex items-center gap-[14px] hover:text-black-45/60">
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
            className="w-8 h-8 border border-solid border-black-45 rounded-full checked:bg-black-45 mr-2 cursor-pointer hover:black-45/60"
          />
        </ul>
      </div>
    </nav>
  );
}

export default Navigacija;
