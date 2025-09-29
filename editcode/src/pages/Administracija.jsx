import { Outlet } from "react-router-dom";
import NavigacijaAdmin from "../components/administracijaComponents/NavigacijaAdmin";
import { useContext, useState } from "react";
import Dodaj from "../components/administracijaComponents/Dodaj";
import userContext from "../components/userContext";

export default function Administracija() {
  const [activeLink, setActiveLink] = useState("/administracija");
  const [dodaj, setDodaj] = useState(false);
  const user = useContext(userContext);

  return (
    <div>
      {user ? (
        <div className="flex flex-col gap-4 px-24 max-[600px]:px-4  pt-4 pb-20 font-inter">
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
      ) : (
        <p className="w-full h-screen flex items-center justify-center text-lg uppercase">
          Niste ovlasteni za pristup ovoj stranici
        </p>
      )}
    </div>
  );
}
