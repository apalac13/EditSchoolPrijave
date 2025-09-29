import { NavLink } from "react-router-dom";

export default function NavigacijaAdmin({ setActiveLink, dodaj, setDodaj }) {
  const items = [
    { link: "/administracija", value: "Radionice" },
    { link: "/administracija/organizacije", value: "Organizacije" },
    { link: "/administracija/predavaci", value: "Predavaci" },
  ];

  return (
    <nav className=" w-full flex justify-between pt-8 pb-2 font-inter text-lg border-b border-blue-45  text-gold-50  ">
      <div className="w-full flex md:flex-row flex-col max-md:items-start items-center justify-between">
        <ul className=" flex flex-row  max-[550px]:flex-col gap-[30px] max-[550px]:gap-1 items-start  ">
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
        <ul className="flex items-center hover:text-gold-50/60">
          <button
            onClick={() => setDodaj(!dodaj)}
            className="border border-blue-46 bg-blue-46 hover:bg-blue-46/80 text-white-70 w-[100px] h-[35px] rounded-md text-sm"
          >
            {dodaj ? <p>Odustani</p> : <p>+Dodaj</p>}
          </button>
        </ul>
      </div>
    </nav>
  );
}
