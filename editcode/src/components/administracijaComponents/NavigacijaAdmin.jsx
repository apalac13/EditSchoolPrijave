import { NavLink } from "react-router-dom";

function NavigacijaAdmin({ setActiveLink, dodaj, setDodaj }) {
  const items = [
    { link: "/administracija", value: "Radionice" },
    { link: "/administracija/organizacije", value: "Organizacije" },
    { link: "/administracija/predavaci", value: "Predavaci" },
  ];

  return (
    <nav className=" w-full flex justify-between pt-8 pb-2 font-inter text-lg border-b border-blue-45  text-gold-50  ">
      <div className=" w-full flex items-center justify-between">
        <ul className=" flex gap-[30px]   ">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className="p-1 text-gold-50 border-gold-50/60 hover:text-gold-50/60"
                onClick={() => setActiveLink(item.link)}
              >
                {item.value}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-[14px] hover:text-gold-50/60">
          <button
            onClick={() => setDodaj(!dodaj)}
            className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[100px] h-[35px] rounded-md text-sm"
          >
            + Dodaj
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default NavigacijaAdmin;
