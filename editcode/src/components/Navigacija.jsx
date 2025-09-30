import { NavLink } from "react-router-dom";

export default function Navigacija({ action, user }) {
  const items = [
    { link: "/", value: "RADIONICE" },
    { link: "/predavaci", value: "PREDAVACI" },
    { link: "/administracija", value: "ADMINISTRACIJA" },
  ];

  return (
    <nav className=" w-full flex justify-between px-10 py-8 font-inter text-xl max-md:text-base  border bottom-1 border-blue-45  text-gold-50  ">
      <div className=" w-full flex  md:flex-row flex-col items-center md:justify-between max-md:gap-2">
        <ul className="flex md:flex-row flex-col md:gap-7 gap-2    ">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className="p-1 text-gold-50  border-gold-50/60 hover:text-gold-50/60"
              >
                {item.value}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-[14px] hover:text-gold-50/60">
          <label className=" cursor-pointer  ">ADMIN</label>
          <input
            alt="admin checckbox"
            type="checkbox"
            value={user}
            checked={user}
            onChange={action}
            className="w-8 h-8 max-md:w-6 max-md:h-6 border border-solid border-blue-46 rounded checked:bg-blue-46 mr-2 cursor-pointer hover:text-black-61/60"
          />
        </ul>
      </div>
    </nav>
  );
}
