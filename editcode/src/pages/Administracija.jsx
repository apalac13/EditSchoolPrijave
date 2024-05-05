import { Outlet } from "react-router-dom";
import NavigacijaAdmin from "../components/administracijaComponents/NavigacijaAdmin";
import { useState } from "react";
import Dodaj from "../components/administracijaComponents/Dodaj";

function Administracija(props) {
  const [activeLink, setActiveLink] = useState("");
  const [dodaj, setDodaj] = useState(false);

  return (
    <div className="flex flex-col gap-8 mx-10 font-inter">
      <NavigacijaAdmin
        setActiveLink={setActiveLink}
        dodaj={dodaj}
        setDodaj={setDodaj}
      />
      {dodaj ? (
        <Dodaj activeLink={activeLink} dodaj={dodaj} setDodaj={setDodaj} />
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Administracija;
