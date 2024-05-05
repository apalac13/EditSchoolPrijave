import { NavLink } from "react-router-dom";

function NavigacijaAdmin(props) {
  const items = [
    { link: "/administracija", value: "Radionice" },
    { link: "/administracija/organizacije", value: "Organizacije" },
    { link: "/administracija/predavci", value: "Predavaci" },
  ];

  return (
    <nav className=" w-full flex justify-between pt-8 pb-4 font-inter text-lg border-b border-blue-45  text-gold-50  ">
      <div className=" w-full flex items-center justify-between">
        <ul className=" flex gap-[30px]   ">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className="p-1 text-gold-50 border-gold-50/60 hover:text-gold-50/60"
              >
                {item.value}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-[14px] hover:text-gold-50/60">
          <button className="">+ Dodaj</button>
        </ul>
      </div>
    </nav>
  );
}

export default NavigacijaAdmin;
